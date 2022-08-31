import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ShowEvent } from '../domain/features/ShowEvent';
import { IEventsRepository } from '../domain/repositories/IEventsRepository';

@injectable()
class ShowEventService implements ShowEvent {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ id }: ShowEvent.Input): Promise<ShowEvent.Output> {
    const event = await this.eventsRepository.findById(id);

    if (!event) throw new AppError('Event not found.');

    const eventDto = event.toPartial();

    return {
      id: eventDto.id,
      ongId: eventDto.ong.id,
      name: eventDto.name,
      email: eventDto.email,
      phone: eventDto.phone,
      description: eventDto.description,
      picture: eventDto.picture,
      date: eventDto.date,
      type: eventDto.type,
      ongName: eventDto.ong.user.name,
      ongAvatar: eventDto.ong.avatar,
      address: eventDto.address,
      isApproved: eventDto.isApproved,
    };
  }
}

export { ShowEventService };
