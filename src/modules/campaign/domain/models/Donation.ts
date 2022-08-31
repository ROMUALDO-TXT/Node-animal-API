import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import {
  Tutor,
  TutorDto,
  TutorPartial,
  TutorProps,
} from '@modules/tutors/domain/models/Tutor';
import {
  Campaign,
  CampaignDto,
  CampaignPartial,
  CampaignProps,
} from './Campaign';
import { BankAccount } from '@modules/ongs/domain/models/BankAccount';

export type DonationStatus = 'PENDING' | 'PAID' | 'AWAITING' | 'FAILED';

export type DonationProps = {
  id?: string;
  status: DonationStatus;
  donationDate: Date;
  amount: number;
  tutor: TutorProps;
  campaign: CampaignProps;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type DonationDto = {
  id: string;
  status: DonationStatus;
  donationDate: Date;
  amount: number;
  tutor: TutorDto;
  campaign: CampaignDto;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type DonationPartial = {
  id: string;
  status: DonationStatus;
  donationDate: Date;
  amount: number;
  tutor: TutorPartial;
  campaign: CampaignPartial;
};

export type UpdateDonationProps = Partial<DonationProps>;

export class Donation extends BaseEntity {
  private readonly donationDate: Date;
  private readonly amount: number;
  private status: DonationStatus;
  private campaign: Campaign;
  private tutor: Tutor;

  constructor(props: DonationProps) {
    super(props);
    this.status = props.status;
    this.donationDate = props.donationDate;
    this.amount = props.amount;
    this.campaign = new Campaign(props.campaign);
    this.tutor = new Tutor(props.tutor);
  }

  getStatus(): DonationStatus {
    return this.status;
  }

  setStatus(data: DonationStatus): void {
    this.status = data;
  }

  getAmount(): number {
    return this.amount;
  }

  getDonationDate(): Date {
    return this.donationDate;
  }

  getCampaignAccount(): BankAccount {
    return this.campaign.getAccount();
  }

  getCampaign(): Campaign {
    return this.campaign;
  }

  getTutor(): Tutor {
    return this.tutor;
  }

  update(donationData: UpdateDonationProps): this {
    Object.assign(this, donationData);
    this.updatedAt = new Date();
    return this;
  }

  toDto(): DonationDto {
    return {
      id: this.id,
      status: this.status,
      donationDate: this.donationDate,
      amount: this.amount,
      tutor: this.tutor.toDto(),
      campaign: this.campaign.toDto(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  toPartial(): DonationPartial {
    return {
      id: this.id,
      status: this.status,
      donationDate: this.donationDate,
      amount: this.amount,
      tutor: this.tutor.toPartial(),
      campaign: this.campaign.toPartial(),
    };
  }
}
