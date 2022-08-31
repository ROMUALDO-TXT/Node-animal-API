export interface ActivateCampaign {
  execute: (data: ActivateCampaign.Input) => Promise<void>;
}

export namespace ActivateCampaign {
  export type Input = {
    ongId: string;
    campaignId: string;
    isActive: boolean;
  };
}
