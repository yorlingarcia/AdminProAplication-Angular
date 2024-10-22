import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  public usuario: User;
  constructor(
    public sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.usuario = usuarioService.usuario;
    console.log(this.usuario);
  }

  logOut() {
    this.usuarioService.logOut();
  }

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboards',
        items: [
          {
            label: 'E-Commerce',
            icon: 'pi pi-home',
            routerLink: '/e-commerce',
          },
        ],
      },
      {
        label: 'Apps',
        items: [
          {
            label: 'Blog',
            icon: 'pi pi-comments',
            items: [
              { label: 'List', icon: 'pi pi-list', routerLink: '/blog/list' },
              {
                label: 'Detail',
                icon: 'pi pi-pencil',
                routerLink: '/blog/detail',
              },
              { label: 'Edit', icon: 'pi pi-pencil', routerLink: '/blog/edit' },
            ],
          },
          {
            label: 'Calendar',
            icon: 'pi pi-calendar',
            routerLink: '/calendar',
          },
          { label: 'Mail', icon: 'pi pi-envelope', routerLink: '/mail' },
        ],
      },
      {
        label: 'UI Kit',
        items: [
          {
            label: 'Form Layout',
            icon: 'pi pi-sliders-h',
            routerLink: '/form-layout',
          },
          { label: 'Table', icon: 'pi pi-table', routerLink: '/table' },
        ],
      },
    ];
  }
}
