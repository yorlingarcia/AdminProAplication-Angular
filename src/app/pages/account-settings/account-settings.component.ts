import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: ``,
})
export class AccountSettingsComponent implements OnInit {
  slectedtheme: string = 'default-dark';
  linkTheme = document.querySelector('#theme')!;
  urlTheme = `./assets/css/colors/${this.slectedtheme}.css`;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (localStorage.getItem('theme')) {
      const url = localStorage.getItem('theme')!;
      this.linkTheme.setAttribute('href', url);
      this.slectedtheme = url.split('/').at(-1)?.split('.').at(0)!;
    } else {
      localStorage.setItem('theme', this.urlTheme);
      this.linkTheme.setAttribute('href', this.urlTheme);
    }
  }
  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.slectedtheme = theme;
  }
}
