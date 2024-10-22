import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsSidebarComponent } from './settings-sidebar/settings-sidebar.component';
import { MainLayoutComponent } from './main/main-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';

import { SidebarModule } from 'primeng/sidebar'; // Sidebar de PrimeNG
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SettingsSidebarComponent,
    MainLayoutComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputSwitchModule,
    MenuModule,
    PanelMenuModule,
    AccordionModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SettingsSidebarComponent,
    MainLayoutComponent,
    FooterComponent,
  ],
})
export class LayoutsModule {}
