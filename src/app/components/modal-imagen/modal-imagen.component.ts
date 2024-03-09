import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { User } from '../../models/user.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``,
})
export class ModalImagenComponent {
  public imagenSubir!: File;
  public imgTemp: string | null | ArrayBuffer = null;

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService
  ) {}

  cerrarModal() {
    this.modalImagenService.cerrarModal();
    this.imgTemp = null;
  }

  cambiarImagen(eventTarget: any) {
    const file = eventTarget.files[0];
    if (!file) {
      this.imgTemp = null;
      return;
    }
    this.imagenSubir = file;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then((img) => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      })
      .catch((err) =>
        Swal.fire('Error', 'No es posible subir la imagen', 'error')
      );
  }
}
