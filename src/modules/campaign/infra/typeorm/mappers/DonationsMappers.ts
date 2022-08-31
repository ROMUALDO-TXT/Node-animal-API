import { CampaignProps } from '@modules/campaign/domain/models/Campaign';
import {
  Donation,
  DonationPartial,
  DonationStatus,
} from '@modules/campaign/domain/models/Donation';
import { TutorProps } from '@modules/tutors/domain/models/Tutor';
import { Donation as DonationDb } from '../entities/Donation';

export class DonationsMappers {
  static mapOne(data: DonationDb): DonationPartial {
    return new Donation({
      id: data.id,
      status: data.status as DonationStatus,
      donationDate: data.donationDate,
      amount: data.amount,
      tutor: data.tutor as TutorProps,
      campaign: data.campaign as CampaignProps,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    }).toPartial();
  }

  static mapMany(donationsDb: DonationDb[]): DonationPartial[] {
    return donationsDb.map(this.mapOne);
  }
}
