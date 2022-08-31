import { inject, injectable } from 'tsyringe';
import { NotifyOng } from '../domain/features/NotifyOng';
import { OngsNotification } from '../domain/models/OngNotification';
import { IOngsNotificationsRepository } from '../domain/repositories/IOngsNotificationsRepository';

@injectable()
class NotifyOngService implements NotifyOng {
  constructor(
    @inject('OngsNotificationsRepository')
    private ongsNotificationsRepository: IOngsNotificationsRepository,
  ) {}

  public async execute(data: NotifyOng.Input): Promise<void> {
    const notification = new OngsNotification({
      read: false,
      ...data,
    });

    await this.ongsNotificationsRepository.save(notification);
  }
}

export { NotifyOngService };
