import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

// import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SidebarComponent, BreadcrumbsComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [SidebarComponent, BreadcrumbsComponent],
})
export class SharedModule {}
