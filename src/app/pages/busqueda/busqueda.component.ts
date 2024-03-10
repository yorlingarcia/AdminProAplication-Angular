import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Medical } from '../../models/medical.model';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: ``,
})
export class BusquedaComponent implements OnInit {
  public usuarios: User[] = [];
  public medicos: Medical[] = [];
  public hospitales: Hospital[] = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private busquedaService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);
    });
  }

  busquedaGlobal(termino: string) {
    this.busquedaService.busquedaGlobal(termino).subscribe((resp: any) => {
      this.hospitales = resp.hospitals;
      this.medicos = resp.medicals;
      this.usuarios = resp.users;
    });
  }
}
