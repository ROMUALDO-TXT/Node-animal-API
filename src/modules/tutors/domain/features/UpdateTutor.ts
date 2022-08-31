import { AddressDto } from '@modules/users/domain/models';
import { TutorPartial } from '../models/Tutor';

export interface UpdateTutor {
  execute: (data: UpdateTutor.Input) => Promise<UpdateTutor.Output>;
}

export namespace UpdateTutor {
  export type Input = {
    tutorId: string;
    avatar?: string;
    name?: string;
    description?: string;
    cpf?: string;
    email?: string;
    phone?: string;
    address?: AddressDto;
  };

  export type Output = TutorPartial;
}
