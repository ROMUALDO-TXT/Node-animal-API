import { BaseEntity } from '@shared/domain/entities/BaseEntity';

export type SignatureStatus =
  | 'ACTIVE'
  | 'CONCLUDED'
  | 'CANCELED'
  | 'INACTIVE'
  | 'FAILED';

export type SignatureProps = {
  id: string;
  createdOn: Date;
  startsOn: Date;
  nextBillingDate: Date;
  dueDay: string;
  status: SignatureStatus;
  accessLink: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type SignatureDto = {
  id: string;
  createdOn: Date;
  startsOn: Date;
  nextBillingDate: Date;
  dueDay: string;
  status: SignatureStatus;
  accessLink: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type SignaturePartial = {
  id: string;
  createdOn: Date;
  startsOn: Date;
  dueDay: string;
  nextBillingDate: Date;
  status: SignatureStatus;
  accessLink: string;
};

export type UpdateSignatureProps = Partial<SignatureProps>;

export class Signature extends BaseEntity {
  private readonly createdOn: Date;
  private readonly startsOn: Date;
  private readonly nextBillingDate: Date;
  private readonly dueDay: string;
  private readonly accessLink: string;
  private status: SignatureStatus;

  constructor(props: SignatureProps) {
    super(props);
    this.createdOn = props.createdOn;
    this.startsOn = props.startsOn;
    this.nextBillingDate = props.nextBillingDate;
    this.dueDay = props.dueDay;
    this.accessLink = props.accessLink;
    this.status = props.status;
  }

  getId(): string {
    return this.id;
  }

  getNextBillingDate(): Date {
    return this.nextBillingDate;
  }

  getStatus(): SignatureStatus {
    return this.status;
  }

  setStatus(data: string): void {
    this.status = data as SignatureStatus;
  }

  update(signatureData: UpdateSignatureProps): this {
    Object.assign(this, signatureData);
    this.updatedAt = new Date();
    return this;
  }

  toDto(): SignatureDto {
    return {
      id: this.id,
      createdOn: this.createdOn,
      startsOn: this.startsOn,
      nextBillingDate: this.nextBillingDate,
      dueDay: this.dueDay,
      status: this.status,
      accessLink: this.accessLink,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  toPartial(): SignaturePartial {
    return {
      id: this.id,
      createdOn: this.createdOn,
      startsOn: this.startsOn,
      nextBillingDate: this.nextBillingDate,
      dueDay: this.dueDay,
      status: this.status,
      accessLink: this.accessLink,
    };
  }
}
