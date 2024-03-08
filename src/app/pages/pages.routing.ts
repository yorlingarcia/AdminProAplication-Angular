import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Ajustes' },
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
        path: 'usuarios',
        component: UsuariosComponent,
        data: { titulo: 'Usuarios' },
      },
      // {
      //   path: 'medicos',
      //   component: ,
      //   data: { titulo: 'Medicos' },
      // },
      // {
      //   path: 'hospitales',
      //   component: ,
      //   data: { titulo: 'Hospitales' },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
