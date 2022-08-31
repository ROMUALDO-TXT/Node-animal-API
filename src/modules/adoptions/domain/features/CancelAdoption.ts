import { AdoptionPartial } from '../models/Adoption';

export interface CancelAdoption {
  execute: (data: CancelAdoption.Input) => Promise<CancelAdoption.Output>;
}

export namespace CancelAdoption {
  export type Input = {
    tutorId: string;
    adoptionId: string;
  };

  export type Output = AdoptionPartial;
}
