import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async actualizarFoto(
    archivo: File,
    tipo: 'users' | 'medicals' | 'hospitals',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('files', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: formData,
      });
      const data = await resp.json();
      if (data.fileName) {
        return data.fileName;
      } else {
        console.log(data);

        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
