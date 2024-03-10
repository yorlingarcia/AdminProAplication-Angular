import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medical } from '../../../models/medical.model';
import { Subscription, delay } from 'rxjs';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``,
})
export class MedicosComponent implements OnInit, OnDestroy {
  private page: number = 1;
  private limit: number = 5;
  public totalMedicos: number = 0;
  public medicos: Medical[] = [];
  public tempMedicos: Medical[] = [];
  public next: string | null = null;
  public prev: string | null = null;
  public subscription?: Subscription;
  public cargando: boolean = true;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {
    this.cargarMedicos();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarMedicos());
  }

  cargarMedicos(prevNext: string | null = null) {
    this.cargando = true;
    this.medicoService
      .cargarMedicos(this.page, this.limit, prevNext)
      .subscribe(({ next, prev, total, medicals }) => {
        this.medicos = medicals;
        this.tempMedicos = medicals;
        this.totalMedicos = total;
        this.prev = prev;
        this.next = next;

        this.cargando = false;
      });
  }

  eliminarMedico(medico: Medical) {
    Swal.fire({
      title: 'Eliminar Medicos',
      text: `Esta seguro de eliminar a "${medico.name}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico).subscribe((resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El Medico ha sido eliminado correctamente!',
            showConfirmButton: false,
            timer: 1000,
          });
          this.cargarMedicos();
        });
      }
    });
  }

  abrirModal(medico: Medical) {
    this.modalImagenService.abrirModal('medicals', medico.id!, medico.img);
  }

  buscarMedicos(termino: string) {
    if (termino.trim().length === 0) {
      this.medicos = this.tempMedicos;
      return;
    }
    this.busquedaService
      .buscar('medicals', termino)
      .subscribe((medicos: Medical[]) => {
        this.medicos = medicos;
      });
  }

  //crea un nuevo medico
  async abrirSwalAlert() {
    const { value } = await Swal.fire({
      title: 'crear Medico',
      input: 'text',
      inputValidator: (value) => {
        if (!value || value.trim().length < 0) {
          console.log('alert!!');
          return 'Ingrese un texto no vacio';
        } else {
          return;
        }
      },
      inputLabel: 'Ingrese el nombre del nuevo Medico',
      inputPlaceholder: 'Nombre del Medico...',
      showCancelButton: true,
    });
    if (value) {
      this.medicoService.crearMedico(value).subscribe((resp: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Medico creado correctamente!',
          showConfirmButton: false,
          timer: 1000,
        });
        // this.medicos.push(resp);
      });
    }
  }
}
