import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;
declare const google: any;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  get id() {
    return this.usuario.id || '';
  }

  get headers() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
      map((resp: any) => {
        const { name, email, password, img, google, role, id } = resp.user;
        this.usuario = new User(name, email, '', img, google, role, id);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      // map((resp) => true),
      catchError((err) => {
        console.log({ errVT: err });
        return of(false);
      })
    );
  }

  actualizarPerfil(data: { name: string; email: string; role: string }) {
    console.log(this.token);

    return this.http.put(`${base_url}/users/${this.id}`, data, this.headers);
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginUser(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  logOut() {
    localStorage.removeItem('token');
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

  cargarUsuarios(
    page: number = 1,
    limit: number = 5,
    prevNext: string | null = null
  ) {
    let url;
    if (prevNext) {
      const params = prevNext.split('/').at(2);
      url = `${base_url}/${params}`;
    } else {
      url = `${base_url}/users?limit=${limit}&page=${page}`;
    }

    return this.http.get<CargarUsuarios>(url, this.headers).pipe(
      map((resp: CargarUsuarios) => {
        const usuarios = resp.users.map(
          (user) =>
            new User(
              user.name,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.id
            )
        );
        return {
          next: resp.next,
          prev: resp.prev,
          total: resp.total,
          users: usuarios,
        };
      })
    );
  }

  eliminarUsuario(usuario: User) {
    const url = `${base_url}/users/${usuario.id}`;
    return this.http.delete(url, this.headers);
  }
}
