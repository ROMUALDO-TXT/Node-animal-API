import { AddressProps } from '@modules/users/domain/models';
import { OngDto } from '../models/Ong';

export interface CreateOng {
  execute: (data: CreateOng.Input) => Promise<CreateOng.Output>;
}

export namespace CreateOng {
  export type Input = {
    name: string;
    cnpj: string;
    email: string;
    password: string;
    phone: string;
    address: AddressProps;
  };

  export type Output = OngDto;
}
