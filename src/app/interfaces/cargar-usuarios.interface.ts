import { User } from '../models/user.model';

export interface CargarUsuarios {
  limit: number;
  next: string | null;
  page: number;
  prev: string | null;
  total: number;
  users: User[];
}
