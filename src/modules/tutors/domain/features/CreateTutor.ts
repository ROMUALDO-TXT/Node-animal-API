import { AddressProps } from '@modules/users/domain/models';
import { TutorPartial } from '../models/Tutor';

export interface CreateTutor {
  execute: (data: CreateTutor.Input) => Promise<CreateTutor.Output>;
}

export namespace CreateTutor {
  export type Input = {
    name: string;
    cpf: string;
    email: string;
    password: string;
    phone: string;
    address: AddressProps;
  };

  export type Output = TutorPartial;
}
