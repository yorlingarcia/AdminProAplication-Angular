import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

// import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [SidebarComponent, BreadcrumbsComponent, ButtonComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [SidebarComponent, BreadcrumbsComponent],
})
export class SharedModule {}
