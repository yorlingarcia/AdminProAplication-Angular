import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CargarHospitales } from '../interfaces/cargar-hospitales.interface';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
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

  cargarHospitales(
    page: number = 1,
    limit: number = 5,
    prevNext: string | null = null
  ) {
    let url;
    if (prevNext) {
      const params = prevNext.split('/').at(2);
      url = `${base_url}/${params}`;
    } else {
      url = `${base_url}/hospitals?limit=${limit}&page=${page}`;
    }

    return this.http.get<CargarHospitales>(url, this.headers);
  }

  crearHospital(nombre: string) {
    const url = `${base_url}/hospitals`;
    return this.http.post<Hospital>(url, { name: nombre }, this.headers);
  }

  actualizarHospital(nombre: string, id: string) {
    const url = `${base_url}/hospitals/${id}`;
    return this.http.put<Hospital>(url, { name: nombre }, this.headers);
  }

  eliminarHospital(hospital: Hospital) {
    const url = `${base_url}/hospitals/${hospital.id}`;
    return this.http.delete(url, this.headers);
  }
}
