import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { Event } from '../domain/models/Event';
import { IEventsRepository } from '../domain/repositories/IEventsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ApproveEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Event> {
    let event = await this.eventsRepository.findById(id);

    if (!event) throw new AppError('Event not found.');

    event.setApproved(true);

    event = await this.eventsRepository.save(event);

    return event;
  }
}

export { ApproveEventService };
