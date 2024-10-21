import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { authGuard } from '../core/guards/auth.guard';
import { authLoadGuard } from '../core/guards/auth-load.guard';
import { MainLayoutComponent } from './main/main-layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    canLoad: [authLoadGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
