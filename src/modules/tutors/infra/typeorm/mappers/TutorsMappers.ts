import { Tutor, TutorPartial } from '@modules/tutors/domain/models/Tutor';
import { Tutor as TutorDb } from '../entities/Tutor';

export class TutorMapper {
  static mapOne(data: TutorDb): TutorPartial {
    return new Tutor({
      id: data.id,
      description: data.description,
      avatar: data.avatar,
      banner: data.banner,
      cpf: data.cpf,
      adoptionRequirements: data.adoptionRequirements,
      user: data.user,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    }).toPartial();
  }

  static mapMany(tutorsDb: TutorDb[]): TutorPartial[] {
    return tutorsDb.map(this.mapOne);
  }
}
