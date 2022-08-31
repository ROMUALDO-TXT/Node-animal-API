import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import { Tutor, TutorDto } from './Tutor';

export type NotificationProps = {
  subject: string;
  read: boolean;
  ongPicture: string;
  tutor: Tutor;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type TutorsNotificationDto = {
  id: string;
  subject: string;
  ongPicture: string;
  read: boolean;
  tutor: TutorDto;
};
export type notifications = {
  notifications: TutorsNotificationDto[];
  alert: boolean;
};

export class TutorsNotification extends BaseEntity {
  private readonly subject: string;
  private read: boolean;
  private tutor: Tutor;
  private ongPicture: string;

  constructor(props: NotificationProps) {
    super(props);
    this.subject = props.subject;
    this.read = props.read;
    this.tutor = props.tutor;
    this.ongPicture = props.ongPicture;
  }

  getTutor(): Tutor {
    return this.tutor;
  }

  setRead(): void {
    this.read = true;
  }
  getRead(): boolean {
    return this.read;
  }
  getSubject(): string {
    return this.subject;
  }
  getPicture(): string {
    return this.ongPicture;
  }

  toDto(): TutorsNotificationDto {
    return {
      id: this.id,
      tutor: this.tutor.toDto(),
      ongPicture: this.ongPicture,
      read: this.read,
      subject: this.subject,
    };
  }
}
