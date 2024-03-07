import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { SwalModal } from '../../config/swal.adapter';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      name: ['Yorlin Garcia', [Validators.required, Validators.minLength(3)]],
      email: ['yorlin@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      password2: ['123456', [Validators.required]],
      terminos: [false, [Validators.required]],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private swalModal: SwalModal
  ) {}

  crearUsuario() {
    this.formSubmitted = true;
    if (!this.registerForm.get('terminos')?.value)
      this.registerForm.setErrors({ aceptaTerminos: false });
    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (resp) => {
        console.log('Usuario creado');
        console.log({ resp });
      },
      (err) => {
        this.swalModal.modalFire('Error', err.error.message, 'error');
      }
    );
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  passwordNoValid(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    }
    return false;
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}
