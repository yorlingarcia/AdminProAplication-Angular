import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: ``,
})
export class AccountSettingsComponent {
  slectedtheme: string = '';
  constructor(private settingsService: SettingsService) {
    this.slectedtheme = this.settingsService.slectedtheme;
  }

  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
    this.slectedtheme = theme;
  }
}
