import {
  NotificationProps,
  OngsNotification,
} from '@modules/ongs/domain/models/OngNotification';
import { IOngsNotificationsRepository } from '@modules/ongs/domain/repositories/IOngsNotificationsRepository';
import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { OngsNotification as OngsNotificationDb } from '../entities/OngsNotification';

@EntityRepository(OngsNotificationDb)
class OngsNotificationsRepository implements IOngsNotificationsRepository {
  private readonly ormRepository: Repository<OngsNotificationDb>;
  constructor() {
    this.ormRepository = getRepository(OngsNotificationDb);
  }

  public async listByOngId(
    ongId: string,
  ): Promise<PaginatedRepositoryResponse<OngsNotification>> {
    const [notifications, count] = (await this.ormRepository.findAndCount({
      where: {
        ong: ongId,
      },
      order: {
        createdAt: 'ASC',
      },
    })) as [unknown, number] as [OngsNotification[], number];

    return {
      itens: notifications,
      numberOfItens: count,
    };
  }
  public async findById(id: string): Promise<OngsNotification | undefined> {
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
    let n: OngsNotification | undefined;
    if (OngsNotification) {
      n = new OngsNotification(notification as unknown as NotificationProps);
    }

    return n;
  }

  public async save(
    notificationData: OngsNotification,
  ): Promise<OngsNotification> {
    const dto = notificationData.toDto();
    const notificationDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(notificationDb);

    return new OngsNotification(notificationDb as unknown as NotificationProps);
  }

  public async softDelete(data: OngsNotification): Promise<void> {
    const dto = data.toDto();

    const notificationDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(notificationDb);
  }
}
export { OngsNotificationsRepository };
