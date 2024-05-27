export interface SolicitudPago {
  fechaHora: string;
  empresa: string;
  areaOperacion: string;
  dependencia: string;
  rubro: string;
  tipo: string;
  identificacion: number;
  concepto: string;
  placa: string;
  valorOperacion: number;
  factura: File;
  observaciones: string;
}
