import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  public meniItems: any[];
  public usuario: User;
  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.meniItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
  }

  logOut() {
    this.usuarioService.logOut();
  }
}
