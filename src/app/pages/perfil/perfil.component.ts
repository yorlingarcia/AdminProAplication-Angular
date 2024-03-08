import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``,
})
export class PerfilComponent {
  public usuario: User;
  public perfilForm: FormGroup;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.usuario = usuarioService.usuario;
    this.perfilForm = this.fb.group({
      name: [this.usuario.name, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      role: [this.usuario.role, [Validators.required]],
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService
      .actualizarPerfil(this.perfilForm.value)
      .subscribe(({ name, email, role }: any) => {
        this.usuario.name = name;
        this.usuario.email = email;
        this.usuario.role = role;
      });
  }
}
