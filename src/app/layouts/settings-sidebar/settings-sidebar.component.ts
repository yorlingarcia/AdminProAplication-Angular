import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrl: './settings-sidebar.component.css',
})
export class SettingsSidebarComponent {
  @Output() rippleEffectChange = new EventEmitter<boolean>(); // Emitir cambios del ripple effect
  isSidebarOpen = false;

  fontSizes = [12, 14, 16, 18, 20];
  selectedFontSize = 2;
  menuType = 'Static';
  colorScheme = 'Light';
  rippleEffect = true;

  closeSettingsSidebar() {
    this.isSidebarOpen = false;
  }

  changeTheme(theme: string) {
    // Aquí iría la lógica para cambiar el tema
    document.body.classList.remove(
      'default-theme',
      'green-theme',
      'pink-theme',
      'dark-theme'
    );
    if (theme) {
      document.body.classList.add(theme);
    }
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

  toggleRippleEffect() {
    // Emitir el estado del ripple effect hacia el main layout
    this.rippleEffectChange.emit(this.rippleEffect);
  }
}
