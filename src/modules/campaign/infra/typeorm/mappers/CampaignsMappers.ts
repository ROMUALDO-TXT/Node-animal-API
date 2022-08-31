import {
  Campaign,
  CampaignPartial,
} from '@modules/campaign/domain/models/Campaign';
import { BankAccountProps } from '@modules/ongs/domain/models/BankAccount';
import { OngProps } from '@modules/ongs/domain/models/Ong';
import { Campaign as CampaignDb } from '../entities/Campaign';

export class CampaignsMappers {
  static mapOne(data: CampaignDb): CampaignPartial {
    return new Campaign({
      id: data.id,
      idCampaign: data.idCampaign,
      name: data.name,
      description: data.description,
      isActive: data.isActive,
      isApproved: data.isApproved,
      amountCollected: data.amountCollected,
      amountExpected: data.amountExpected,
      picture: data.picture,
      account: data.account as BankAccountProps,
      ong: data.ong as OngProps,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    }).toPartial();
  }

  static mapMany(campaignsDb: CampaignDb[]): CampaignPartial[] {
    return campaignsDb.map(this.mapOne);
  }
}
