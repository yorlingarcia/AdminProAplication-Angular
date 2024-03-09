interface _HospitalUSer {
  id: string;
  namme: string;
  img?: string;
}

export class Hospital {
  constructor(
    public name: string,
    public id?: string,
    public img?: string,
    public user?: _HospitalUSer
  ) {}
}
