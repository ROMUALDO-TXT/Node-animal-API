import { PatronizePartial } from '../models/Patronize';

export interface CreatePatronize {
  execute: (data: CreatePatronize.Input) => Promise<CreatePatronize.Output>;
}

export namespace CreatePatronize {
  export type Input = {
    description: string;
    planName: string;
    planAmount: number;
    planId: string;
    animalId: string;
    tutorId: string;
  };

  export type Output = PatronizePartial;
}
