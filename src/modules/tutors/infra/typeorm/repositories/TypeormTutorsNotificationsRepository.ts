import {
  NotificationProps,
  TutorsNotification,
} from '@modules/tutors/domain/models/TutorNotification';
import { ITutorsNotificationsRepository } from '@modules/tutors/domain/repositories/ITutorsNotificationsRepository';
import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TutorsNotification as NotificationDb } from '../entities/TutorsNotification';

@EntityRepository(NotificationDb)
class TutorsNotificationsRepository implements ITutorsNotificationsRepository {
  private readonly ormRepository: Repository<NotificationDb>;

  constructor() {
    this.ormRepository = getRepository(NotificationDb);
  }

  public async listByTutorId(
    ongId: string,
  ): Promise<PaginatedRepositoryResponse<TutorsNotification>> {
    const [notifications, count] = (await this.ormRepository.findAndCount({
      where: {
        ong: ongId,
      },
      order: {
        createdAt: 'ASC',
      },
    })) as [unknown, number] as [TutorsNotification[], number];

    return {
      itens: notifications,
      numberOfItens: count,
    };
  }
  public async findById(id: string): Promise<TutorsNotification | undefined> {
    const notification = await this.ormRepository.findOne({
      join: {
        alias: 'n',
        leftJoinAndSelect: {
          ong: 'n.ong',
        },
      },
      where: {
        id: id,
      },
      order: {
        createdAt: 'ASC',
      },
    });
    let n: TutorsNotification | undefined;
    if (TutorsNotification) {
      n = new TutorsNotification(notification as unknown as NotificationProps);
    }

    return n;
  }

  public async save(
    notificationData: TutorsNotification,
  ): Promise<TutorsNotification> {
    const dto = notificationData.toDto();
    const notificationDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(notificationDb);

    return new TutorsNotification(
      notificationDb as unknown as NotificationProps,
    );
  }

  public async softDelete(data: TutorsNotification): Promise<void> {
    const dto = data.toDto();

    const notificationDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(notificationDb);
  }
}
export { TutorsNotificationsRepository };
