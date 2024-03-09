import { Hospital } from '../models/hospital.model';

export interface CargarHospitales {
  limit: number;
  next: string | null;
  page: number;
  prev: string | null;
  total: number;
  hospitals: Hospital[];
}
