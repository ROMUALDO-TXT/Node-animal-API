import { AddressProps, User } from '../models';

export interface CreateVolunteer {
  execute: (data: CreateVolunteer.Input) => Promise<CreateVolunteer.Output>;
}

export namespace CreateVolunteer {
  export type Input = {
    name: string;
    email: string;
    phone: string;
    sendViaEmail: boolean;
    addressData: AddressProps;
  };

  export type Output = User;
}
