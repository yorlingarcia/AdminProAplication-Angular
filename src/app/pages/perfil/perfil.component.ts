import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import { SwalModal } from '../../config/swal.adapter';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``,
})
export class PerfilComponent {
  public usuario: User;
  public perfilForm: FormGroup;
  public imagenSubir!: File;
  public imgTemp: string | null | ArrayBuffer = null;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private swalModal: SwalModal
  ) {
    this.usuario = usuarioService.usuario;
    this.perfilForm = this.fb.group({
      name: [this.usuario.name, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      role: [this.usuario.role, [Validators.required]],
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(
      ({ name, email, role }: any) => {
        this.usuario.name = name;
        this.usuario.email = email;
        this.usuario.role = role;
        this.swalModal.modalFire(
          'Guardado',
          'Cambios fueron guardados',
          'success'
        );
      },
      (err) => this.swalModal.modalFire('Error', err.error.message, 'error')
    );
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

  subirimagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'users', this.usuario.id!)
      .then((img) => {
        this.usuario.img = img;
        this.swalModal.modalFire(
          'Guardado',
          'Imagen de usuario actualizada',
          'success'
        );
      })
      .catch((err) =>
        this.swalModal.modalFire(
          'Error',
          'No es posible subir la imagen',
          'error'
        )
      );
  }
}
