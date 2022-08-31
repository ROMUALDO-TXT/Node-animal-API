import { OngDto } from '../models/Ong';

export interface UpdateOngPassword {
  execute: (data: UpdateOngPassword.Input) => Promise<UpdateOngPassword.Output>;
}

export namespace UpdateOngPassword {
  export type Input = {
    id: string;
    oldPassword: string;
    password: string;
  };

  export type Output = OngDto;
}
