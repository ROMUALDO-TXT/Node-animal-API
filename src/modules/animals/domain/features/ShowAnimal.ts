import { AnimalPictureDto } from '../models/AnimalPicture';

export interface ShowAnimal {
  execute: (data: ShowAnimal.Input) => Promise<ShowAnimal.Output>;
}

export namespace ShowAnimal {
  export type Input = {
    id: string;
  };

  export type Output = {
    id?: string;
    name: string;
    description?: string;
    bornDate: Date;
    shelterEnterDate: Date;
    sex: string;
    size: string;
    species: string;
    type: string;
    costsDescription?: string;
    monthlyCosts?: number;
    isAvailable: boolean;
    adoptionDate?: Date;
    ongName: string;
    ongAvatar?: string;
    pictures: AnimalPictureDto[];
  };
}
