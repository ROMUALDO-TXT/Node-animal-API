import AppError from '@shared/errors/AppError';
import { CreateDonation } from '../domain/features/CreateDonation';
import { inject, injectable } from 'tsyringe';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';
import { ITutorsRepository } from '@modules/tutors/domain/repositories/ITutorsRepository';
import { IDonationsRepository } from '../domain/repositories/IDonationsRepository';
import { CampaignProps } from '../domain/models/Campaign';
import { TutorProps } from '@modules/tutors/domain/models/Tutor';
import { Donation } from '../domain/models/Donation';

@injectable()
class CreateDonationService implements CreateDonation {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
    @inject('BankAccountsRepository')
    private donationsRepository: IDonationsRepository,
  ) {}

  public async execute({
    campaignId,
    tutorId,
    status,
    amount,
  }: CreateDonation.Input): Promise<CreateDonation.Output> {
    const tutor = await this.tutorsRepository.findById(tutorId);

    if (!tutor) throw new AppError('Tutor not found');

    const campaign = await this.campaignsRepository.findById(campaignId);

    if (!campaign) throw new AppError('Campaign not found');

    let donate = new Donation({
      donationDate: new Date(),
      amount,
      status,
      campaign: campaign.toDto() as CampaignProps,
      tutor: tutor.toDto() as TutorProps,
    });

    donate = await this.donationsRepository.save(donate);

    // const ongNotification: OngsNotificationDTO = {
    //   subject: `A campanha ${campaign.name} recebeu uma doação!`,
    //   ong: campaign.ong,
    // };

    return donate.toPartial();
  }
}

export { CreateDonationService };
