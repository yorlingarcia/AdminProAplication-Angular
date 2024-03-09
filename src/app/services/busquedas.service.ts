import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  transformarUsuarios(data: any) {
    return data.map(
      (user: User) =>
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
  }

  buscar(tipo: 'users' | 'medicals' | 'hospitals', termino: string) {
    const url = `${base_url}/search/colection/${tipo}/${termino}`;

    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'users':
            return this.transformarUsuarios(resp.data);
          default:
            return [];
        }
      })
    );
  }
}
