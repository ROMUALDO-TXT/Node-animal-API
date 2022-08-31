import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { OngsNotification } from '../domain/models/OngNotification';
import { IOngsNotificationsRepository } from '../domain/repositories/IOngsNotificationsRepository';

@injectable()
class ListOngsNotificationService {
  constructor(
    @inject('OngsNotificationsRepository')
    private ongsNotificationsRepository: IOngsNotificationsRepository,
  ) {}

  public async execute(
    ongId: string,
  ): Promise<PaginatedRepositoryResponse<OngsNotification>> {
    const notifications = await this.ongsNotificationsRepository.listByOngId(
      ongId,
    );

    return notifications;
  }
}

export { ListOngsNotificationService };
