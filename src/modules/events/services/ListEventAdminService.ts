import { Pagination } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { ListEventsAdmin } from '../domain/features/ListEventsAdmin';
import { IEventsRepository } from '../domain/repositories/IEventsRepository';

@injectable()
class ListEventAdminService implements ListEventsAdmin {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(
    data: ListEventsAdmin.Input,
    pagination: Pagination,
  ): Promise<ListEventsAdmin.Output> {
    const events = await this.eventsRepository.listEventsAdminFilter(
      data,
      pagination,
    );

    return events;
  }
}

export { ListEventAdminService };
