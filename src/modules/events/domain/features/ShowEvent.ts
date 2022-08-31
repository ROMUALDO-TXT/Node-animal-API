import { AddressDto } from '@modules/users/domain/models';

export interface ShowEvent {
  execute: (data: ShowEvent.Input) => Promise<ShowEvent.Output>;
}

export namespace ShowEvent {
  export type Input = {
    id: string;
  };

  export type Output = {
    id: string;
    ongId: string;
    name: string;
    email: string;
    phone: string;
    description: string;
    picture: string;
    date: Date;
    type: string;
    ongName: string;
    ongAvatar?: string;
    address?: AddressDto;
    isApproved: boolean;
  };
}
