import { AddressDto } from '@modules/users/domain/models';
import { OngDto } from '../models/Ong';

export interface UpdateOng {
  execute: (data: UpdateOng.Input) => Promise<UpdateOng.Output>;
}

export namespace UpdateOng {
  export type Input = {
    ongId: string;
    avatar?: string;
    name?: string;
    description?: string;
    cnpj?: string;
    email?: string;
    phone?: string;
    address?: AddressDto;
  };

  export type Output = OngDto;
}
