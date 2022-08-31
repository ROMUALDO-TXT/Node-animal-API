import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/container/providers/storageProviders/DiskStorageProvider';
import crypto from 'crypto';
import { CreateCampaign } from '../domain/features/CreateCampaign';
import { inject, injectable } from 'tsyringe';
import { ICampaignsRepository } from '../domain/repositories/ICampaignsRepository';
import { IOngsRepository } from '@modules/ongs/domain/repositories/IOngsRepository';
import { IBankAccountsRepository } from '@modules/ongs/domain/repositories/IBankAccountsRepository';
import { Campaign } from '../domain/models/Campaign';
import { OngProps } from '@modules/ongs/domain/models/Ong';
import { BankAccountProps } from '@modules/ongs/domain/models/BankAccount';

@injectable()
class CreateCampaignService implements CreateCampaign {
  constructor(
    @inject('CampaignsRepository')
    private campaignsRepository: ICampaignsRepository,
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
    @inject('BankAccountsRepository')
    private accountsRepository: IBankAccountsRepository,
  ) {}

  public async execute({
    name,
    description,
    amountExpected,
    amountCollected,
    pictureFilename,
    ongId,
    accountId,
  }: CreateCampaign.Input): Promise<CreateCampaign.Output> {
    const ong = await this.ongsRepository.findById(ongId);

    if (!ong) throw new AppError('Ong not found.');

    const account = await this.accountsRepository.findById(accountId);

    if (!account) throw new AppError('Bank account does not exists');

    if (!pictureFilename) throw new AppError('Picture not found');

    const diskProvider = new DiskStorageProvider();

    const filename = await diskProvider.saveFile(pictureFilename);

    const idCampaign = `Campanha-${crypto.randomBytes(5).toString('hex')}`;

    let campaign = new Campaign({
      name,
      description,
      idCampaign,
      amountExpected,
      amountCollected,
      isActive: false,
      isApproved: false,
      picture: filename,
      ong: ong.toDto() as OngProps,
      account: account.toDto() as BankAccountProps,
    });
    campaign = await this.campaignsRepository.save(campaign);

    // const ongNotification: OngsNotificationDTO = {
    //   subject: `A campanha ${name} foi enviada para a aprovação dos administradores`,
    //   ong,
    // };
    return campaign.toPartial();
  }
}

export { CreateCampaignService };
