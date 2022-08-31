import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import { Ong, OngDto } from './Ong';

export type NotificationProps = {
  subject: string;
  read: boolean;
  ong: Ong;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type OngsNotificationDto = {
  id: string;
  subject: string;
  read: boolean;
  ong: OngDto;
};
export type notifications = {
  notifications: OngsNotificationDto[];
  alert: boolean;
};

export class OngsNotification extends BaseEntity {
  private readonly subject: string;
  private read: boolean;
  private ong: Ong;

  constructor(props: NotificationProps) {
    super(props);
    this.subject = props.subject;
    this.read = props.read;
    this.ong = props.ong;
  }

  getOng(): Ong {
    return this.ong;
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

  toDto(): OngsNotificationDto {
    return {
      id: this.id,
      ong: this.ong.toDto(),
      read: this.read,
      subject: this.subject,
    };
  }
}
