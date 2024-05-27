import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
})
export class MantenimientoComponent implements OnInit {
  fechaActual: string; // Consulta de fecha y hora actual
  nuevaSolicitudPagos: Array<String> = [];
  solicitudForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.fechaActual = this.obtenerFechaActual();
    this.solicitudForm = this.formBuilder.group({
      fechaHora: ['', Validators.required],
      empresa: ['', Validators.required],
      areaOperacion: ['', Validators.required],
      dependencia: ['', Validators.required],
      rubro: ['', Validators.required],
      tipo: ['', Validators.required],
      identificacion: ['', Validators.required],
      concepto: ['', Validators.required],
      placa: ['', Validators.required],
      valorOperacion: ['', Validators.required],
      factura: ['', Validators.required],
      observaciones: ['', Validators.required],
    });
  }
  obtenerFechaActual(): string {
    const now = new Date();
    // Formato YYYY-MM-DDTHH:MM
    return now.toISOString().slice(0, 16);
  }

  ngOnInit(): void {}

  guardarSolicitud(): void {
    if (this.solicitudForm.valid) {
      // Aquí puedes guardar la información en una variable llamada nuevaSolicitudPagos
      const nuevaSolicitudPagos = this.solicitudForm.value;
      console.log(nuevaSolicitudPagos);
      // Limpia el formulario después de guardar
      this.solicitudForm.reset();
    } else {
      // Si el formulario no es válido, muestra un mensaje de error o toma otra acción adecuada
      console.log('Formulario inválido');
    }
  }
}
