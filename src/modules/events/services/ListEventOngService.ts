import { Pagination } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { ListEventsOng } from '../domain/features/ListEventOng';
import { IEventsRepository } from '../domain/repositories/IEventsRepository';

@injectable()
class ListEventOngService implements ListEventsOng {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(
    { ongId, ...data }: ListEventsOng.Input,
    pagination: Pagination,
  ): Promise<ListEventsOng.Output> {
    const events = await this.eventsRepository.listEventsOngFilter(
      ongId,
      data,
      pagination,
    );

    return events;
  }
}

export { ListEventOngService };
