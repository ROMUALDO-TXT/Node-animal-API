import { AdoptionPartial } from '../models/Adoption';

export interface CreateAdoption {
  execute: (data: CreateAdoption.Input) => Promise<CreateAdoption.Output>;
}

export namespace CreateAdoption {
  export type Input = {
    tutorId: string;
    animalId: string;
  };

  export type Output = AdoptionPartial;
}
