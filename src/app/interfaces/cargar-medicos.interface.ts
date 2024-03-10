import { Medical } from '../models/medical.model';

export interface CargarMedicos {
  limit: number;
  next: string | null;
  page: number;
  prev: string | null;
  total: number;
  medicals: Medical[];
}
