import { AnimalPartial } from '../models/Animal';

export interface CreateAnimal {
  execute: (data: CreateAnimal.Input) => Promise<CreateAnimal.Output>;
}

export namespace CreateAnimal {
  export type Input = {
    type: string;
    name: string;
    description: string;
    bornDate: Date;
    sex: string;
    size: string;
    species: string;
    shelterEnterDate: Date;
    ongId: string;
    costsDescription?: string;
    monthlyCosts?: number;
    picturesFilenames?: string[];
  };

  export type Output = AnimalPartial;
}
