import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ActivateCampaign } from '../domain/features/ActivateCampaign';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';

@injectable()
class ActivateCampaignService implements ActivateCampaign {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute({
    isActive,
    campaignId,
    ongId,
  }: ActivateCampaign.Input): Promise<void> {
    const campaign = await this.campaignsRepository.findById(campaignId);

    if (!campaign) throw new AppError('Campaign not found.');

    if (ongId && campaign.getOng().toDto().id !== ongId)
      throw new AppError('This campaign does not belong to this ong.');

    if (!campaign.getApproved())
      throw new AppError(
        'This campaign can not be activated, because it was not approved by the administrator',
      );

    campaign.setActive(isActive);

    await this.campaignsRepository.save(campaign);
  }
}

export { ActivateCampaignService };
