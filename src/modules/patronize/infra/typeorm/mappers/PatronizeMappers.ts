import { AnimalProps } from '@modules/animals/domain/models/Animal';
import {
  Patronize,
  PatronizePartial,
} from '@modules/patronize/domain/models/Patronize';
import { SignatureProps } from '@modules/patronize/domain/models/Signature';
import { TutorProps } from '@modules/tutors/domain/models/Tutor';
import { Patronize as PatronizeDb } from '../entities/Patronize';

export class PatronizeMapper {
  static mapOne(data: PatronizeDb): PatronizePartial {
    return new Patronize({
      id: data.id,
      status: data.status,
      description: data.description,
      conclusionDate: data.conclusionDate,
      planName: data.planName,
      planAmount: data.planAmount,
      planId: data.planId,
      signature: data.signature as SignatureProps,
      tutor: data.tutor as TutorProps,
      animal: data.animal as unknown as AnimalProps,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    }).toPartial();
  }

  static mapMany(PatronizesDb: PatronizeDb[]): PatronizePartial[] {
    return PatronizesDb.map(this.mapOne);
  }
}
