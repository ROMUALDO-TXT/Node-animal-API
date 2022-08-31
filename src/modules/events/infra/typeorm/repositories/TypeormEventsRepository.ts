import {
  Event,
  EventPartial,
  EventProps,
} from '@modules/events/domain/models/Event';
import {
  IEventsRepository,
  FilterEventsDTO,
} from '@modules/events/domain/repositories/IEventsRepository';
import { EventsMappers } from '../mappers/EventsMapper';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import dayjs from 'dayjs';
import {
  Any,
  Between,
  EntityRepository,
  getRepository,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Event as EventDb } from '../entities/Event';

@EntityRepository(EventDb)
class EventsRepository implements IEventsRepository {
  private readonly ormRepository: Repository<EventDb>;

  constructor() {
    this.ormRepository = getRepository(EventDb);
  }

  public async findById(id: string): Promise<Event | undefined> {
    const eventData = await this.ormRepository.findOne({
      join: {
        alias: 'event',
        leftJoinAndSelect: {
          ong: 'event.ong',
          address: 'event.address',
        },
      },
      where: {
        id,
      },
    });

    let event: Event | undefined;
    if (eventData) {
      event = new Event(eventData as unknown as EventProps);
    }
    return event;
  }

  public async listAllFilter(
    { name, period, ...rest }: FilterEventsDTO.List,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<EventPartial>> {
    const filter: Record<string, unknown> = {};

    Object.entries(rest).forEach(([key, value]) => {
      if (value) {
        filter[key] = value;
      }
    });

    let startDate = new Date();
    let endDate = new Date();
    if (period) {
      switch (period) {
        case 'Week':
          endDate = dayjs(startDate).endOf('week').toDate();
          break;
        case 'Month':
          endDate = dayjs(startDate).endOf('month').toDate();
          break;
        case 'NextMonth':
          endDate = dayjs(startDate).add(1, 'month').endOf('month').toDate();
          startDate = dayjs(endDate).startOf('month').toDate();
          break;
      }
    } else {
      endDate = dayjs(startDate).add(10, 'years').toDate();
    }

    //If the filter is empty
    if (rest.type[0] === ' ') {
      const dbTypes = await this.ormRepository
        .createQueryBuilder('event')
        .select(['event.type'])
        .distinctOn(['event.type'])
        .orderBy('event.type')
        .getMany();
      const types: string[] = [];
      dbTypes.forEach(e => {
        types.push(e.type);
      });
      filter['type'] = types;
    }

    if (rest.state[0] === '') {
      filter['state'] = [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
      ];
    }
    let eventData: EventDb[] = [];
    let count: number;

    if (name) {
      [eventData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'event',
          leftJoinAndSelect: {
            address: 'event.address',
            ong: 'event.ong',
          },
        },
        where: {
          address: {
            state: Any(filter['state'] as string[]),
          },
          type: Any(filter['type'] as string[]),
          name: Like(name),
          isApproved: true,
          date: Between(startDate, endDate),
        },
        order: {
          date: 'ASC',
        },
        skip,
        take,
      });
    } else {
      [eventData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'event',
          leftJoinAndSelect: {
            address: 'event.address',
            ong: 'event.ong',
          },
        },
        where: {
          address: {
            state: Any(filter['state'] as string[]),
          },
          type: Any(filter['type'] as string[]),
          isApproved: true,
          date: Between(startDate, endDate),
        },
        order: {
          date: 'ASC',
        },
        skip,
        take,
      });
    }

    return {
      numberOfItens: count,
      itens: EventsMappers.mapMany(eventData),
    };
  }

  public async listEventsOngFilter(
    ongId: string,
    { name, isActive }: FilterEventsDTO.ListActive,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<EventPartial>> {
    let eventData: EventDb[] = [];
    let count: number;

    if (name) {
      [eventData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'event',
          leftJoinAndSelect: {
            address: 'event.address',
            ong: 'event.ong',
          },
        },
        where: {
          ong: {
            id: ongId,
          },
          name: Like(name),
          date: MoreThanOrEqual(new Date()),
          isApproved: isActive,
        },
        order: {
          date: 'ASC',
        },
        skip,
        take,
      });
    } else {
      [eventData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'event',
          leftJoinAndSelect: {
            address: 'event.address',
            ong: 'event.ong',
          },
        },
        where: {
          ong: {
            id: ongId,
          },
          isApproved: isActive,
          date: MoreThanOrEqual(new Date()),
        },
        order: {
          date: 'ASC',
        },
        skip,
        take,
      });
    }

    return {
      numberOfItens: count,
      itens: EventsMappers.mapMany(eventData),
    };
  }

  public async listEventsAdminFilter(
    { name, isActive }: FilterEventsDTO.ListActive,
    { skip, take }: Pagination,
  ): Promise<PaginatedRepositoryResponse<EventPartial>> {
    let eventData: EventDb[] = [];
    let count: number;

    if (name) {
      [eventData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'event',
          leftJoinAndSelect: {
            address: 'event.address',
            ong: 'event.ong',
          },
        },
        where: {
          name: Like(name),
          isApproved: isActive,
          date: MoreThanOrEqual(new Date()),
        },
        order: {
          date: 'ASC',
        },
        skip,
        take,
      });
    } else {
      [eventData, count] = await this.ormRepository.findAndCount({
        join: {
          alias: 'event',
          leftJoinAndSelect: {
            address: 'event.address',
            ong: 'event.ong',
          },
        },
        where: {
          isApproved: isActive,
          date: MoreThanOrEqual(new Date()),
        },
        order: {
          date: 'ASC',
        },
        skip,
        take,
      });
    }

    return {
      numberOfItens: count,
      itens: EventsMappers.mapMany(eventData),
    };
  }

  public async save(eventData: Event): Promise<Event> {
    const dto = eventData.toDto();
    const eventDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(eventDb);

    return new Event(eventDb as EventProps);
  }
  public async softDelete(data: Event): Promise<void> {
    const dto = data.toDto();

    const eventDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(eventDb);
  }
}

export { EventsRepository };
