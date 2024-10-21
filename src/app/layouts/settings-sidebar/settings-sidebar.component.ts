import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrl: './settings-sidebar.component.css',
})
export class SettingsSidebarComponent {
  isSidebarOpen = true; // Esto lo manejarás desde el componente padre

  fontSizes = [12, 14, 16, 18, 20];
  selectedFontSize = 2;

  menuType = 'Static';
  colorScheme = 'Light';
  rippleEffect = true;

  // Método para cerrar el sidebar
  closeSettingsSidebar() {
    this.isSidebarOpen = false;
  }

  decreaseFontSize() {
    if (this.selectedFontSize > 0) {
      this.selectedFontSize--;
      this.applyFontSize();
    }
  }

  increaseFontSize() {
    if (this.selectedFontSize < this.fontSizes.length - 1) {
      this.selectedFontSize++;
      this.applyFontSize();
    }
  }

  applyFontSize() {
    document.documentElement.style.setProperty(
      '--font-size',
      `${this.fontSizes[this.selectedFontSize]}px`
    );
  }
}
