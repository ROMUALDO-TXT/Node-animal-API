import {
  Adoption,
  AdoptionPartial,
} from '@modules/adoptions/domain/models/Adoption';
import { AnimalProps } from '@modules/animals/domain/models/Animal';
import { TutorProps } from '@modules/tutors/domain/models/Tutor';
import { Adoption as AdoptionDb } from '../entities/Adoption';

export class AdoptionMappers {
  static mapOne(data: AdoptionDb): AdoptionPartial {
    return new Adoption({
      id: data.id,
      description: data.description,
      conclusionDate: data.conclusionDate,
      status: data.status,
      tutor: data.tutor as TutorProps,
      animal: data.animal as unknown as AnimalProps,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    }).toPartial();
  }

  static mapMany(adoptionDb: AdoptionDb[]): AdoptionPartial[] {
    return adoptionDb.map(this.mapOne);
  }
}
