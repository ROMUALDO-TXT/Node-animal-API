import { CampaignPartial } from '../models/Campaign';

export interface UpdateCampaign {
  execute: (data: UpdateCampaign.Input) => Promise<UpdateCampaign.Output>;
}

export namespace UpdateCampaign {
  export type Input = {
    id: string;
    idCampaign: string;
    name: string;
    description: string;
    amountExpected: number;
    pictureFilename?: string;
    isActive: boolean;
    isApproved: boolean;
    ongId: string;
  };

  export type Output = CampaignPartial;
}
