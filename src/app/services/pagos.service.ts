import { Injectable } from '@angular/core';
import { SolicitudPago } from '../interfaces/solicitud-pagos.interface';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  // registrosSolicitudPagos
  // autorizacionPagos
  // historialPagos

  constructor() {}

  private _pagos: Array<SolicitudPago> = [];

  set pagos(pago: SolicitudPago) {
    this._pagos.push(pago);
  }
}
