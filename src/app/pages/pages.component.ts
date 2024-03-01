import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``,
})
export class PagesComponent implements OnInit {
  slectedtheme: string = 'default-dark';
  linkTheme = document.querySelector('#theme')!;
  urlTheme = `./assets/css/colors/${this.slectedtheme}.css`;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

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
