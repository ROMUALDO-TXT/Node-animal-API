import {
  Animal,
  AnimalPartial,
  AnimalSex,
  AnimalSize,
  AnimalType,
} from '@modules/animals/domain/models/Animal';
import { AnimalPictureProps } from '@modules/animals/domain/models/AnimalPicture';
import { OngProps } from '@modules/ongs/domain/models/Ong';
import { Animal as AnimalDb } from '../entities/Animal';

export class AnimalMappers {
  static mapOne(data: AnimalDb): AnimalPartial {
    return new Animal({
      id: data.id,
      name: data.name,
      description: data.description,
      bornDate: data.bornDate,
      shelterEnterDate: data.shelterEnterDate,
      sex: data.sex as AnimalSex,
      size: data.size as AnimalSize,
      species: data.species,
      type: data.type as AnimalType,
      costsDescription: data.costsDescription,
      monthlyCosts: data.monthlyCosts,
      isAvailable: data.isAvailable,
      adoptionDate: data.adoptionDate,
      ong: data.ong as OngProps,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      pictures: data.pictures as unknown as AnimalPictureProps[],
    }).toPartial();
  }

  static mapMany(animalDb: AnimalDb[]): AnimalPartial[] {
    return animalDb.map(this.mapOne);
  }
}
