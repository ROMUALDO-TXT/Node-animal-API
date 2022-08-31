import { OngDto } from '../models/Ong';

export interface UpdateOngBanner {
  execute: (data: UpdateOngBanner.Input) => Promise<UpdateOngBanner.Output>;
}

export namespace UpdateOngBanner {
  export type Input = {
    ongId: string;
    banner?: string;
  };

  export type Output = OngDto;
}
