import { Pagination } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { ListEvents } from '../domain/features/ListEvents';
import { IEventsRepository } from '../domain/repositories/IEventsRepository';

@injectable()
class ListEventService implements ListEvents {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(
    data: ListEvents.Input,
    pagination: Pagination,
  ): Promise<ListEvents.Output> {
    const events = await this.eventsRepository.listAllFilter(data, pagination);

    return events;
  }
}

export { ListEventService };
