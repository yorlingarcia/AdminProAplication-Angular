import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    // Configurar los ítems del menú
    this.items = [
      { label: 'Privacy', icon: 'pi pi-lock', command: () => this.onPrivacy() },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => this.onSettings(),
      },
      { separator: true },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.onLogout(),
      },
    ];
  }

  // Funciones asociadas a los comandos del menú
  onPrivacy() {
    console.log('Privacy clicked');
  }

  onSettings() {
    console.log('Settings clicked');
  }

  onLogout() {
    console.log('Logout clicked');
  }
}
