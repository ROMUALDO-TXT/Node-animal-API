import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { TutorsNotification } from '../domain/models/TutorNotification';
import { ITutorsNotificationsRepository } from '../domain/repositories/ITutorsNotificationsRepository';

@injectable()
class ListTutorsNotificationsService {
  constructor(
    @inject('TutorNotificationsRepository')
    private notificationsRepository: ITutorsNotificationsRepository,
  ) {}

  public async execute(
    tutorId: string,
  ): Promise<PaginatedRepositoryResponse<TutorsNotification>> {
    const notifications = await this.notificationsRepository.listByTutorId(
      tutorId,
    );

    return notifications;
  }
}

export { ListTutorsNotificationsService };
