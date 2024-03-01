import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent, BreadcrumbsComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, HeaderComponent, BreadcrumbsComponent],
})
export class SharedModule {}
