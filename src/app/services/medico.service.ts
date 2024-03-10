import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Medical } from '../models/medical.model';
import { CargarMedicos } from '../interfaces/cargar-medicos.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
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

  cargarMedicos(
    page: number = 1,
    limit: number = 5,
    prevNext: string | null = null
  ) {
    let url;
    if (prevNext) {
      const params = prevNext.split('/').at(2);
      url = `${base_url}/${params}`;
    } else {
      url = `${base_url}/medicals?limit=${limit}&page=${page}`;
    }

    return this.http.get<CargarMedicos>(url, this.headers);
  }

  crearMedico(nombre: string) {
    const url = `${base_url}/medicals`;
    return this.http.post<Medical>(url, { name: nombre }, this.headers);
  }

  actualizarMedico(nombre: string, id: string) {
    const url = `${base_url}/medicals/${id}`;
    return this.http.put<Medical>(url, { name: nombre }, this.headers);
  }

  eliminarMedico(medico: Medical) {
    const url = `${base_url}/medicals/${medico.id}`;
    return this.http.delete(url, this.headers);
  }
}
