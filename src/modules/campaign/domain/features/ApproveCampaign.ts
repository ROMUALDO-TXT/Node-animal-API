export interface ApproveCampaign {
  execute: (data: ApproveCampaign.Input) => Promise<void>;
}

export namespace ApproveCampaign {
  export type Input = {
    id: string;
    isApproved: boolean;
  };
}
