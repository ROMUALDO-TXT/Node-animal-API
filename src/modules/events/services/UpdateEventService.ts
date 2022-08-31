import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/container/providers/storageProviders/DiskStorageProvider';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';
import { UpdateEvent } from '../domain/features/UpdateEvent';
import { IEventsRepository } from '../domain/repositories/IEventsRepository';

@injectable()
class UpdateEventService implements UpdateEvent {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    name,
    description,
    date,
    email,
    phone,
    type,
    pictureFilename,
    eventId,
    addressData,
  }: UpdateEvent.Input): Promise<UpdateEvent.Output> {
    let event = await this.eventsRepository.findById(eventId);

    if (!event) throw new AppError('Event does not exists.');

    date = new Date(date);

    const days = dayjs().diff(date, 'days') * -1;

    if (days <= 0)
      throw new AppError('The event date is invalid, set a date further away');

    const updateEvent = {
      name: name ?? event.getName(),
      description: description ?? event.getDescription(),
      email: email ?? event.getEmail(),
      date,
      phone: phone ?? event.getPhone(),
      type: type ?? event.getType(),
      address: addressData,
    };

    const currentPicture = event.getPicture();
    if (pictureFilename) {
      const diskProvider = new DiskStorageProvider();
      if (currentPicture) {
        await diskProvider.deleteFile(event.getPicture());
      }
      const filename = await diskProvider.saveFile(pictureFilename);
      Object.assign(updateEvent, { picture: filename });
    }

    event.update(updateEvent);

    event = await this.eventsRepository.save(event);

    return event.toPartial();
  }
}

export { UpdateEventService };
