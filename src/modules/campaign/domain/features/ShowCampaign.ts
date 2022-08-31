export interface ShowCampaign {
  execute: (data: ShowCampaign.Input) => Promise<ShowCampaign.Output>;
}

export namespace ShowCampaign {
  export type Input = {
    id: string;
  };

  export type Output = {
    id?: string;
    idCampaign: string;
    name: string;
    description: string;
    picture: string;
    amountCollected?: number;
    amountExpected?: number;
    ongId: string;
    accountId: string;
    ongName: string;
    ongAvatar?: string;
  };
}
