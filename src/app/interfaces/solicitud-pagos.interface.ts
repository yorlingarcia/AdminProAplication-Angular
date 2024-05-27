export interface SolicitudPago {
  fechaHora: Date;
  empresa: string;
  areaOperacion: string;
  dependencia: string;
  rubro: string;
  tipo: string;
  identificacion: number;
  nombreEmpleadoProveedor: string;
  concepto: string;
  placa: string;
  valorOperacion: number;
  factura: File;
  observaciones: string;
}
