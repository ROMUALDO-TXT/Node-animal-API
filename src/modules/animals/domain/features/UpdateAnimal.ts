import { AnimalPartial } from '../models/Animal';

export interface UpdateAnimal {
  execute: (data: UpdateAnimal.Input) => Promise<UpdateAnimal.Output>;
}

export namespace UpdateAnimal {
  export type Input = {
    id: string;
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
