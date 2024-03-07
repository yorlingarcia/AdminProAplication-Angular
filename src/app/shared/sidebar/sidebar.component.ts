import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  meniItems: any[];
  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.meniItems = sidebarService.menu;
  }

  logOut() {
    this.usuarioService.logOut();
  }
}
