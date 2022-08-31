import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/container/providers/storageProviders/DiskStorageProvider';
import dayjs from 'dayjs';
import { CreateEvent } from '../domain/features/CreateEvent';
import { inject, injectable } from 'tsyringe';
import { IEventsRepository } from '../domain/repositories/IEventsRepository';
import { IOngsRepository } from '@modules/ongs/domain/repositories/IOngsRepository';
import { Event } from '../domain/models/Event';
import { OngProps } from '@modules/ongs/domain/models/Ong';

@injectable()
class CreateEventService implements CreateEvent {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
  ) {}

  public async execute({
    name,
    description,
    date,
    email,
    phone,
    type,
    pictureFilename,
    ongId,
    addressData,
  }: CreateEvent.Input): Promise<CreateEvent.Output> {
    const ong = await this.ongsRepository.findById(ongId);

    if (!ong) throw new AppError('Ong not found.');

    if (!pictureFilename) throw new AppError('Picture not found');

    date = new Date(date);
    const days = dayjs(date).diff(new Date(), 'days');

    if (days <= 0)
      throw new AppError('The event date is invalid, set a date further away');

    const isApproved = false;

    const diskProvider = new DiskStorageProvider();
    const picture = await diskProvider.saveFile(pictureFilename);

    let event = new Event({
      name,
      description,
      date,
      email,
      phone,
      type,
      picture,
      isApproved,
      ong: ong.toDto() as OngProps,
      address: addressData,
    });

    event = await this.eventsRepository.save(event);

    return event.toPartial();
  }
}

export { CreateEventService };
