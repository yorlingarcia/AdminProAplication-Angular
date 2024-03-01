import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``,
})
export class PagesComponent {
  slectedtheme: string;
  constructor(private settingsService: SettingsService) {
    this.slectedtheme = this.settingsService.slectedtheme;
  }

  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
    this.slectedtheme = this.settingsService.slectedtheme;
  }
}
