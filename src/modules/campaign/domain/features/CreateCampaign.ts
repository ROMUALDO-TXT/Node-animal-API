import { CampaignPartial } from '../models/Campaign';

export interface CreateCampaign {
  execute: (data: CreateCampaign.Input) => Promise<CreateCampaign.Output>;
}

export namespace CreateCampaign {
  export type Input = {
    name: string;
    description: string;
    amountExpected: number;
    amountCollected: number;
    pictureFilename?: string;
    ongId: string;
    accountId: string;
  };

  export type Output = CampaignPartial;
}
