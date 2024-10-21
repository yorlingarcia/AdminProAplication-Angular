import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  isSettingsSidebarOpen = false;

  toggleSettingsSidebar() {
    this.isSettingsSidebarOpen = !this.isSettingsSidebarOpen;
  }

  closeSettingsSidebar() {
    this.isSettingsSidebarOpen = false;
  }
}
