import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SwalModal {
  constructor() {}

  modalFire(title: string, message: string, icon: SweetAlertIcon) {
    Swal.fire(title, message, icon);
  }
}
