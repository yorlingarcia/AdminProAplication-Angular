interface _MedicalUSer {
  id: string;
  namme: string;
  img?: string;
}

export class Medical {
  constructor(
    public name: string,
    public hospital: _MedicalUSer,
    public id?: string,
    public img?: string,
    public user?: _MedicalUSer
  ) {}
}
