import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import {
  Ong,
  OngDto,
  OngPartial,
  OngProps,
} from '@modules/ongs/domain/models/Ong';
import {
  BankAccount,
  BankAccountDto,
  BankAccountProps,
} from '@modules/ongs/domain/models/BankAccount';

export type CampaignProps = {
  id?: string;
  idCampaign: string;
  name: string;
  description?: string;
  isActive: boolean;
  isApproved: boolean;
  amountCollected?: number;
  amountExpected?: number;
  picture: string;
  account: BankAccountProps;
  ong: OngProps;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type CampaignDto = {
  id?: string;
  idCampaign: string;
  name: string;
  description: string;
  isActive: boolean;
  isApproved: boolean;
  amountCollected?: number;
  amountExpected?: number;
  picture: string;
  account: BankAccountDto;
  ong: OngDto;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type CampaignPartial = {
  id?: string;
  idCampaign: string;
  name: string;
  description: string;
  isActive: boolean;
  isApproved: boolean;
  amountCollected?: number;
  amountExpected?: number;
  picture: string;
  ong: OngPartial;
};

export type UpdateCampaignProps = Partial<CampaignProps>;

export class Campaign extends BaseEntity {
  private readonly idCampaign: string;
  private readonly name: string;
  private readonly description?: string;
  private readonly picture: string;
  private amountCollected?: number;
  private amountExpected?: number;
  private isActive: boolean;
  private isApproved: boolean;
  private ong: Ong;
  private account: BankAccount;

  constructor(props: CampaignProps) {
    super(props);
    this.idCampaign = props.idCampaign;
    this.name = props.name;
    this.description = props.description;
    this.amountCollected = props.amountCollected;
    this.amountExpected = props.amountExpected;
    this.ong = new Ong(props.ong);
    this.account = new BankAccount(props.account);
    this.isActive = props.isApproved;
    this.isApproved = props.isActive;
    this.picture = props.picture;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description || '';
  }

  getApproved(): boolean {
    return this.isApproved;
  }

  setApproved(data: boolean): void {
    this.isApproved = data;
  }

  getActive(): boolean {
    return this.isApproved;
  }

  setActive(data: boolean): void {
    this.isApproved = data;
  }

  getOng(): Ong {
    return this.ong;
  }

  getAccount(): BankAccount {
    return this.account;
  }

  getAmountCollected(): number | undefined {
    return this.amountCollected;
  }

  setAmountCollected(data: number): void {
    this.amountCollected = data;
  }

  getAmountExpected(): number | undefined {
    return this.amountExpected;
  }

  getPicture(): string {
    return this.picture;
  }

  // getAvatarUrl(): string | undefined {
  //     return this.avatarUrl;
  // }

  // generateAvatarUrl(filename: string): string {
  //     switch (env.storage) {
  //         case 'spaces':
  //             return `https://${env.spaces.bucket}.nyc3.digitaloceanspaces.com/${env.spaces.projectFolder}/avatar/${filename}`;
  //         default:
  //             return `${String(env.apiUrl)}/avatar/${filename}`;
  //     }
  // }

  update(campaignData: UpdateCampaignProps): this {
    Object.assign(this, campaignData);
    this.updatedAt = new Date();
    return this;
  }

  toDto(): CampaignDto {
    return {
      id: this.id,
      idCampaign: this.idCampaign,
      name: this.name,
      description: this.description || '',
      picture: this.picture,
      isActive: this.isActive,
      isApproved: this.isApproved,
      amountCollected: this.amountCollected,
      amountExpected: this.amountExpected,
      ong: this.ong.toDto(),
      account: this.account.toDto(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  toPartial(): CampaignPartial {
    return {
      id: this.id,
      idCampaign: this.idCampaign,
      name: this.name,
      description: this.description || '',
      isActive: this.isActive,
      isApproved: this.isApproved,
      amountCollected: this.amountCollected,
      amountExpected: this.amountExpected,
      picture: this.picture,
      ong: this.ong.toPartial(),
    };
  }
}
