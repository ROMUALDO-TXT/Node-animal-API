import { inject, injectable } from 'tsyringe';
import { NotifyTutor } from '../domain/features/NotifyTutor';
import { TutorsNotification } from '../domain/models/TutorNotification';
import { ITutorsNotificationsRepository } from '../domain/repositories/ITutorsNotificationsRepository';

@injectable()
class NotifyTutorService implements NotifyTutor {
  constructor(
    @inject('TutorsNotificationsRepository')
    private tutorsNotificationsRepository: ITutorsNotificationsRepository,
  ) {}

  public async execute(data: NotifyTutor.Input): Promise<void> {
    const notification = new TutorsNotification({
      read: false,
      ...data,
    });

    await this.tutorsNotificationsRepository.save(notification);
  }
}

export { NotifyTutorService };
