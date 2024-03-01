import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  slectedtheme: string = 'default-dark';
  linkTheme = document.querySelector('#theme')!;
  urlTheme = `./assets/css/colors/${this.slectedtheme}.css`;

  constructor() {
    const url = localStorage.getItem('theme') || this.urlTheme;
    this.linkTheme.setAttribute('href', url);
    this.slectedtheme = url.split('/').at(-1)?.split('.').at(0)!;
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.slectedtheme = theme;
  }
}
