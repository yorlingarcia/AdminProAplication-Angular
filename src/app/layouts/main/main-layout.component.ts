import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  isSettingsSidebarOpen = false; // Asegúrate de que esté inicializado en false
  rippleEffect = true; // Variable para controlar el ripple effect desde el main

  toggleSettingsSidebar() {
    this.isSettingsSidebarOpen = !this.isSettingsSidebarOpen;
    console.log(
      'Sidebar toggle called. Current state:',
      this.isSettingsSidebarOpen
    ); // Agrega un log para verificar el cambio
  }

  setRippleEffect(value: boolean) {
    this.rippleEffect = value;
  }
}
