import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { authGuard } from '../core/guards/auth.guard';
import { authLoadGuard } from '../core/guards/auth-load.guard';

const routes: Routes = [
  {
    path: 'dashboard2',
    component: PagesComponent,
    canActivate: [authGuard],
    canLoad: [authLoadGuard],
    loadChildren: () =>
      import('./child-module.module').then((m) => m.ChildModuleModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
