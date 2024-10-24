import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';

import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { adminGuard } from '../guards/admin.guard';
import { DireccionFinancieraComponent } from './depedencia/direccion-financiera/direccion-financiera.component';
import { MantenimientoComponent } from './depedencia/mantenimiento/mantenimiento.component';
import { TesoreriaComponent } from './depedencia/tesoreria/tesoreria.component';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { titulo: 'Dashboard' },
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { titulo: 'Ajustes de cuenta' },
  },
  {
    path: 'grafica1',
    component: Grafica1Component,
    data: { titulo: 'Grafica #1' },
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { titulo: 'Perfil' },
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { titulo: 'ProgressBar' },
  },
  {
    path: 'promise',
    component: PromesasComponent,
    data: { titulo: 'Promesas' },
  },

  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Mantenimiento
  {
    path: 'medicos',
    component: MedicosComponent,
    data: { titulo: 'Medicos' },
  },
  {
    path: 'medico/:id',
    component: MedicoComponent,
    data: { titulo: 'Mantenimiento de Medico' },
  },
  {
    path: 'hospitales',
    component: HospitalesComponent,
    data: { titulo: 'Mantenimineto de Hospitales' },
  },
  {
    path: 'buscar/:termino',
    component: BusquedaComponent,
    data: { titulo: 'Busqueda' },
  },
  {
    path: 'direccion_financiera',
    component: DireccionFinancieraComponent,
    data: { titulo: 'Dirección Financiera' },
  },
  {
    path: 'mantenimiento',
    component: MantenimientoComponent,
    data: { titulo: 'Mantenimiento' },
  },
  {
    path: 'tesoreria',
    component: TesoreriaComponent,
    data: { titulo: 'Tesorería' },
  },
  //Ruta Admin
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: { titulo: 'Usuarios' },
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildModuleModule {}
