import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ApproveCampaign } from '../domain/features/ApproveCampaign';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';

@injectable()
class ApproveCampaignService implements ApproveCampaign {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute({
    isApproved,
    id,
  }: ApproveCampaign.Input): Promise<void> {
    const campaign = await this.campaignsRepository.findById(id);

    if (!campaign) throw new AppError('Campaign not found.');

    campaign.setApproved(isApproved);

    await this.campaignsRepository.save(campaign);
  }
}

export { ApproveCampaignService };
