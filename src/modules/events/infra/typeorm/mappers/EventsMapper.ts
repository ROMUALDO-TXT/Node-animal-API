import { Event, EventPartial } from '@modules/events/domain/models/Event';
import { OngProps } from '@modules/ongs/domain/models/Ong';
import { Event as EventDb } from '../entities/Event';

export class EventsMappers {
  static mapOne(data: EventDb): EventPartial {
    return new Event({
      id: data.id,
      name: data.name,
      description: data.description,
      email: data.email,
      phone: data.phone,
      type: data.type,
      date: data.date,
      picture: data.picture,
      isApproved: data.isApproved,
      address: data.address,
      ong: data.ong as OngProps,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    }).toPartial();
  }

  static mapMany(eventsDb: EventDb[]): EventPartial[] {
    return eventsDb.map(this.mapOne);
  }
}
