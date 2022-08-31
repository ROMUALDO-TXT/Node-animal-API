import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/container/providers/storageProviders/DiskStorageProvider';
import { UpdateCampaign } from '../domain/features/UpdateCampaign';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';
import { inject, injectable } from 'tsyringe';
import { OngProps } from '@modules/ongs/domain/models/Ong';
import { BankAccountProps } from '@modules/ongs/domain/models/BankAccount';

@injectable()
class UpdateCampaignService implements UpdateCampaign {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute({
    id,
    idCampaign,
    name,
    description,
    amountExpected,
    pictureFilename,
    isActive,
    isApproved,
    ongId,
  }: UpdateCampaign.Input): Promise<UpdateCampaign.Output> {
    let campaign = await this.campaignsRepository.findById(id);

    if (!campaign) throw new AppError('Campaign not found.');

    const campaignDto = campaign.toDto();

    if (campaignDto.ong.id !== ongId)
      throw new AppError('This campaign doesnt belong to this ong');

    const updateCampaign = {
      id,
      idCampaign,
      name: name ?? campaignDto.name,
      description: description ?? campaignDto.description,
      amountExpected: amountExpected ?? campaignDto.amountExpected,
      isActive: isActive ?? campaignDto.isActive,
      isApproved: isApproved ?? campaignDto.isApproved,
      ong: campaignDto.ong as OngProps,
      account: campaignDto.account as BankAccountProps,
      amountCollected: campaignDto.amountCollected,
    };

    let picture = campaignDto.picture;

    if (pictureFilename) {
      const diskProvider = new DiskStorageProvider();
      if (campaignDto.picture) {
        await diskProvider.deleteFile(campaignDto.picture);
      }
      const filename = await diskProvider.saveFile(pictureFilename);
      picture = filename;
    }

    Object.assign(updateCampaign, { picture });

    campaign = await this.campaignsRepository.save(campaign);

    // const ongNotification: OngsNotificationDTO = {
    //   subject: `A campanha ${data.name} foi enviada para a aprovação dos administradores`,
    //   ong: campaign.ong,
    // };
    // campaign.ong.cnpj = '';
    return campaign.toPartial();
  }
}

export { UpdateCampaignService };
