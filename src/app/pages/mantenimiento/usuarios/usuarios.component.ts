import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { User } from '../../../models/user.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { CargarUsuarios } from '../../../interfaces/cargar-usuarios.interface';
import { SwalModal } from '../../../config/swal.adapter';
import Swal from 'sweetalert2';

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
  public tempUsuarios: User[] = [];
  public next: string | null = null;
  public prev: string | null = null;

  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private swalModal: SwalModal
  ) {
    this.cargarUsuarios();
  }

  cargarUsuarios(prevNext: string | null = null) {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.page, this.limit, prevNext)
      .subscribe(({ next, prev, total, users }) => {
        this.usuarios = users;
        this.tempUsuarios = users;
        this.totalUsuarios = total;
        this.prev = prev;
        this.next = next;

        this.cargando = false;
      });
  }

  buscar(termino: string) {
    if (termino.trim().length === 0) {
      // this.cargarUsuarios();
      this.usuarios = this.tempUsuarios;
      return;
    }
    this.busquedaService.buscar('users', termino).subscribe((resp: User[]) => {
      this.usuarios = resp;
    });
  }

  eliminarUsuario(usuario: User) {
    Swal.fire({
      title: 'Eliminar usuario',
      text: `Esta seguro de eliminar a ${usuario.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          this.cargarUsuarios();
        });
      }
    });
  }
}
