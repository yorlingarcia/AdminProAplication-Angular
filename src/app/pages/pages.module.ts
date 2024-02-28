import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
  ],
})
export class PagesModule {}
