import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { LoginForm } from '../../interfaces/login-form.interface';
import { SwalModal } from '../../config/swal.adapter';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required]],
    remember: [false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private swalModal: SwalModal
  ) {}
  ngAfterViewInit(): void {
    this.googleInit();
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '26805093594-ee1ag8sdsp5eufv5b2eb13u1q226082b.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      // document.getElementById('buttonDiv'),
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    // console.log('Encoded JWT ID token: ' + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe((resp) => {
      this.router.navigateByUrl('/');
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    this.usuarioService.loginUser(this.loginForm.value as LoginForm).subscribe(
      (resp) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value!);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.swalModal.modalFire('Error', err.error.message, 'error');
      }
    );
  }
}
