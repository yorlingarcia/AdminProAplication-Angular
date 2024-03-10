import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

import { MedicoService } from '../../../services/medico.service';
import { Medical } from '../../../models/medical.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from 'chart.js';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ``,
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital;

  public medicoSeleccionado?: Medical;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.medicoForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();
  }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }
  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });

    // this.medicoService.obtnerMedicoById()

    this.medicoForm.get('hospital')?.valueChanges.subscribe((id) => {
      this.hospitalSeleccionado = this.hospitales.find((h) => h.id === id)!;
    });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') return;
    this.medicoService
      .obtnerMedicoById(id)
      .pipe(delay(150))
      .subscribe(
        (medico) => {
          const {
            name,
            hospital: { id },
          } = medico;
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({
            name: name,
            hospital: id,
          });
        },
        (err) => {
          Swal.fire({
            title: 'Error',
            text: err.error.error,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigateByUrl('/dashboard/medicos');
        }
      );
  }

  guardarMedico() {
    if (this.medicoSeleccionado) {
      const data = {
        id: this.medicoSeleccionado.id,
        ...this.medicoForm.value,
      };
      this.medicoService.actualizarMedico(data).subscribe((resp: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Medico ${resp.name} actualizad Correctamente`,
          showConfirmButton: false,
          timer: 1000,
        });
      });
    } else {
      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          const medico = resp.medical;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Medico ${medico.name} Correctamente`,
            showConfirmButton: false,
            timer: 1000,
          });
          this.router.navigateByUrl(`/dashboard/medico/${medico.id}`);
        });
    }
  }

  cargarHospitales() {
    const page = 1;
    const limit = 100;
    this.hospitalService
      .cargarHospitales(page, limit)
      .subscribe(({ hospitals }) => {
        this.hospitales = hospitals;
      });
  }
}
