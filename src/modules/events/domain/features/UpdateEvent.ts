import { AddressProps } from '@modules/users/domain/models';
import { EventPartial } from '../models/Event';

export interface UpdateEvent {
  execute: (data: UpdateEvent.Input) => Promise<UpdateEvent.Output>;
}

export namespace UpdateEvent {
  export type Input = {
    name: string;
    description: string;
    date: Date;
    email: string;
    phone: string;
    type: string;
    pictureFilename?: string;
    eventId: string;
    addressData: AddressProps;
  };

  export type Output = EventPartial;
}
