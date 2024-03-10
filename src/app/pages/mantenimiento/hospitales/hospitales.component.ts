import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Subscription, delay, map, of } from 'rxjs';
import { Hospital } from '../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``,
})
export class HospitalesComponent implements OnInit, OnDestroy {
  private page: number = 1;
  private limit: number = 5;
  public totalHospitales: number = 0;
  public hospitales: Hospital[] = [];
  public tempHospitales: Hospital[] = [];
  public next: string | null = null;
  public prev: string | null = null;
  public subscription?: Subscription;
  public cargando: boolean = true;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService
  ) {
    this.cargarHospitales();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarHospitales());
  }

  cargarHospitales(prevNext: string | null = null) {
    this.cargando = true;
    this.hospitalService
      .cargarHospitales(this.page, this.limit, prevNext)
      .subscribe(({ next, prev, total, hospitals }) => {
        this.hospitales = hospitals;
        this.tempHospitales = hospitals;
        this.totalHospitales = total;
        this.prev = prev;
        this.next = next;

        this.cargando = false;
      });
  }

  guardarCambios(Hospital: Hospital) {
    this.hospitalService
      .actualizarHospital(Hospital.name, Hospital.id!)
      .subscribe((resp) => {
        Swal.fire('Actualizado', Hospital.name, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Eliminar hospital',
      text: `Esta seguro de eliminar a "${hospital.name}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.eliminarHospital(hospital).subscribe((resp) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El hospital ha sido eliminado correctamente!',
            showConfirmButton: false,
            timer: 1000,
          });
          this.cargarHospitales();
        });
      }
    });
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitals', hospital.id!, hospital.img);
  }

  buscarHospitales(termino: string) {
    if (termino.trim().length === 0) {
      this.hospitales = this.tempHospitales;
      return;
    }
    this.busquedaService
      .buscar('hospitals', termino)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }
  //crea un nuevo hospital
  async abrirSwalAlert() {
    const { value } = await Swal.fire({
      title: 'crear Hospital',
      input: 'text',
      inputValidator: (value) => {
        if (!value || value.trim().length < 0) {
          console.log('alert!!');
          return 'Ingrese un texto no vacio';
        } else {
          return;
        }
      },
      inputLabel: 'Ingrese el nombre del nuevo hospital',
      inputPlaceholder: 'Nombre del hospital...',
      showCancelButton: true,
    });
    if (value) {
      this.hospitalService.crearHospital(value).subscribe((resp: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El hospital ha sido creado correctamente!',
          showConfirmButton: false,
          timer: 1000,
        });
        this.hospitales.push(resp.hospital);
      });
    }
  }
}
