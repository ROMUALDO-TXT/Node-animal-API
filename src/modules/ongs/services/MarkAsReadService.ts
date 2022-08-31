import { inject, injectable } from 'tsyringe';
import { OngsNotification } from '../domain/models/OngNotification';
import { IOngsNotificationsRepository } from '../domain/repositories/IOngsNotificationsRepository';

@injectable()
class MarkAsReadService {
  constructor(
    @inject('OngsNotificationsRepository')
    private ongsNotificationsRepository: IOngsNotificationsRepository,
  ) {}

  public async execute(notification: OngsNotification): Promise<void> {
    notification.setRead();

    await this.ongsNotificationsRepository.save(notification);
  }
}

export { MarkAsReadService };
