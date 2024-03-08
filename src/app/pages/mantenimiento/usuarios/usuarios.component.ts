import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``,
})
export class UsuariosComponent {
  private page: number = 1;
  private limit: number = 5;
  public totalUsuarios: number = 0;
  public usuarios: User[] = [];
  public next: string | null = null;
  public prev: string | null = null;
  constructor(private usuarioService: UsuarioService) {
    this.cargarUsuarios();
  }

  cargarUsuarios(prevNext: string | null = null) {
    this.usuarioService
      .cargarUsuarios(this.page, this.limit, prevNext)
      .subscribe(({ next, prev, total, users }) => {
        this.usuarios = users;
        this.totalUsuarios = total;
        this.prev = prev;
        this.next = next;
      });
  }
}
