import { Ong, OngPartial } from '@modules/ongs/domain/models/Ong';
import { Ong as OngDb } from '../entities/Ong';

export class OngsMappers {
  static mapOne(data: OngDb): OngPartial {
    return new Ong({
      id: data.id,
      description: data.description ?? '',
      avatar: data.avatar,
      banner: data.banner,
      cnpj: data.cnpj,
      isApproved: data.isApproved,
      user: data.user,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    }).toPartial();
  }

  static mapMany(tutorsDb: OngDb[]): OngPartial[] {
    return tutorsDb.map(this.mapOne);
  }
}
