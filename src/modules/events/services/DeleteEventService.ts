import DiskStorageProvider from '@shared/container/providers/storageProviders/DiskStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IEventsRepository } from '../domain/repositories/IEventsRepository';

interface IRequest {
  id: string;
  ongId: string;
}

@injectable()
class DeleteEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ id, ongId }: IRequest): Promise<void> {
    const event = await this.eventsRepository.findById(id);

    if (!event) throw new AppError('Event not found.');

    const ong = event.getOng();

    if (ong.toDto().id === ongId) {
      const picture = event.getPicture();
      if (picture) {
        const diskProvider = new DiskStorageProvider();
        await diskProvider.deleteFile(picture);
      }
      await this.eventsRepository.softDelete(event);
    } else {
      throw new AppError("Your ong can't edit this event.");
    }
  }
}

export { DeleteEventService };
