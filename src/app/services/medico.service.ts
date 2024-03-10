import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Medical } from '../models/medical.model';
import { CargarMedicos } from '../interfaces/cargar-medicos.interface';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

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

  crearMedico(medico: { name: string; hospital: string }) {
    const url = `${base_url}/medicals`;
    return this.http.post<Medical>(
      url,
      { name: medico.name, hospital: medico.hospital },
      this.headers
    );
  }

  actualizarMedico(data: { id: string; nombre: string; hospital: string }) {
    const url = `${base_url}/medicals/${data.id}`;
    return this.http.put<Medical>(url, data, this.headers);
  }

  eliminarMedico(medico: Medical) {
    const url = `${base_url}/medicals/${medico.id}`;
    return this.http.delete(url, this.headers);
  }

  obtnerMedicoById(id: string) {
    const url = `${base_url}/medicals/${id}`;
    return this.http
      .get<Medical>(url, this.headers)
      .pipe(map((resp: any) => resp.medical));
  }
}
