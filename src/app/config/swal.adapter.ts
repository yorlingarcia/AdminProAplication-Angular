import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Injectable } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SwalModal {
  constructor(private usuarioService: UsuarioService) {}

  modalFire(title: string, message: string, icon: SweetAlertIcon) {
    Swal.fire(title, message, icon);
  }
}
