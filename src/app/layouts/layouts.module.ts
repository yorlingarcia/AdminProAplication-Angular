import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsSidebarComponent } from './settings-sidebar/settings-sidebar.component';
import { MainLayoutComponent } from './main/main-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SettingsSidebarComponent,
    MainLayoutComponent,
    FooterComponent,
  ],
  imports: [CommonModule, BrowserModule, AppRoutingModule, FormsModule],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SettingsSidebarComponent,
    MainLayoutComponent,
    FooterComponent,
  ],
})
export class LayoutsModule {}
