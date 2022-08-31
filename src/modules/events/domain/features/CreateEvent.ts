import { AddressProps } from '@modules/users/domain/models';
import { EventPartial } from '../models/Event';

export interface CreateEvent {
  execute: (data: CreateEvent.Input) => Promise<CreateEvent.Output>;
}

export namespace CreateEvent {
  export type Input = {
    name: string;
    description: string;
    date: Date;
    email: string;
    phone: string;
    type: string;
    pictureFilename?: string;
    ongId: string;
    addressData: AddressProps;
  };

  export type Output = EventPartial;
}
