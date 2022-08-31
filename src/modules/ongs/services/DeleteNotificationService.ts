import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOngsNotificationsRepository } from '../domain/repositories/IOngsNotificationsRepository';

@injectable()
class DeleteOngNotificationService {
  constructor(
    @inject('OngsNotificationsRepository')
    private ongsNotificationsRepository: IOngsNotificationsRepository,
  ) {}

  public async execute(id: string, ongId: string): Promise<void> {
    const notification = await this.ongsNotificationsRepository.findById(id);

    if (!notification) {
      throw new AppError('Notification not found.');
    }
    const ong = notification.getOng();

    if (ong.id == ongId) {
      await this.ongsNotificationsRepository.softDelete(notification);
    } else {
      throw new AppError('you cannot delete this item.');
    }
  }
}

export { DeleteOngNotificationService };
