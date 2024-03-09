import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { User } from '../../../models/user.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { SwalModal } from '../../../config/swal.adapter';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``,
})
export class UsuariosComponent implements OnInit, OnDestroy {
  private page: number = 1;
  private limit: number = 5;
  public totalUsuarios: number = 0;
  public usuarios: User[] = [];
  public tempUsuarios: User[] = [];
  public next: string | null = null;
  public prev: string | null = null;
  public subscription?: Subscription;
  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {
    this.cargarUsuarios();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarUsuarios());
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
    this.busquedaService
      .buscar('users', termino)
      .subscribe((usuarios: User[]) => {
        this.usuarios = usuarios;
      });
  }

  eliminarUsuario(usuario: User) {
    if (this.usuarioService.id === usuario.id) {
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
      return;
    }
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

  cambiarRole(usuario: User) {
    this.usuarioService.guardarUsuario(usuario).subscribe((resp) => {
      let timerInterval: any;
      Swal.fire({
        title: 'Cambiando role',
        html: 'I will close in <b></b> milliseconds.',
        timer: 500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      //   .then((result) => {
      //   /* Read more about handling dismissals below */
      //   if (result.dismiss === Swal.DismissReason.timer) {
      //   }
      // });
    });
  }

  abrirModal(usuario: User) {
    this.modalImagenService.abrirModal('users', usuario.id!, usuario.img);
  }
}
