import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'USER_ROLE' | 'ADMIN_ROLE',
    public id?: string
  ) {}

  get getImgUrl() {
    if (this.img?.includes('http')) {
      return this.img;
    }
    if (this.img) {
      return `${base_url}/upload/users/${this.img}`;
    } else {
      return `${base_url}/upload/users/no-img`;
    }
  }
}
