import { AddressDto } from '@modules/users/domain/models';

export interface ShowOng {
  execute: (data: ShowOng.Input) => Promise<ShowOng.Output>;
}

export namespace ShowOng {
  export type Input = {
    id: string;
  };

  export type Output = {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    description: string;
    avatar?: string;
    banner?: string;
    address?: AddressDto;
    isApproved: boolean;
  };
}
