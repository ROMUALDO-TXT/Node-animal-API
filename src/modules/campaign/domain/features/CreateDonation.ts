import { DonationPartial, DonationStatus } from '../models/Donation';

export interface CreateDonation {
  execute: (data: CreateDonation.Input) => Promise<CreateDonation.Output>;
}

export namespace CreateDonation {
  export type Input = {
    status: DonationStatus;
    amount: number;
    tutorId: string;
    campaignId: string;
  };

  export type Output = DonationPartial;
}
