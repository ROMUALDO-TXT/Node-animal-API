import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import {
  AddressProps,
  UpdateUserProps,
  User,
  UserPartial,
  UserProps,
} from '@modules/users/domain/models';
import env from '@config/env';

export type OngProps = {
  id?: string;
  description: string;
  avatar?: string;
  avatarUrl?: string;
  banner?: string;
  bannerUrl?: string;
  isApproved: boolean;
  cnpj: string;
  user: UserProps;
  address?: AddressProps | undefined;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type OngDto = {
  id: string;
  description: string;
  avatar: string | undefined;
  avatarUrl: string | undefined;
  banner: string | undefined;
  bannerUrl: string | undefined;
  cnpj: string;
  isApproved: boolean;
  user: UserPartial;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type OngPartial = {
  id: string;
  description: string;
  avatar: string | undefined;
  avatarUrl: string | undefined;
  banner: string | undefined;
  bannerUrl: string | undefined;
  cnpj: string;
  user: UserPartial;
};

export type UpdateOngProps = {
  id?: string;
  description?: string;
  avatar?: string;
  avatarUrl?: string;
  banner?: string;
  bannerUrl?: string;
  isApproved?: boolean;
  cnpj?: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class Ong extends BaseEntity {
  private readonly description: string;
  private readonly cnpj: string;
  private readonly avatar?: string;
  private readonly avatarUrl?: string;
  private readonly banner?: string;
  private readonly bannerUrl?: string;
  private isApproved: boolean;
  private user: User;

  constructor(props: OngProps) {
    super(props);
    this.cnpj = props.cnpj;
    this.description = props.description;
    this.avatar = props.avatar;
    this.avatarUrl = props.avatarUrl;
    this.banner = props.banner;
    this.bannerUrl = props.bannerUrl;
    this.isApproved = props.isApproved;
    this.user = new User(props.user, props.address);
  }

  getId(): string {
    return this.id;
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
  }

  getCnpj(): string {
    return this.cnpj;
  }

  getDescription(): string {
    return this.description;
  }

  getApproved(): boolean {
    return this.isApproved;
  }

  setApproved(data: boolean): void {
    this.isApproved = data;
  }
  getBanner(): string | undefined {
    return this.banner;
  }

  getBannerUrl(): string | undefined {
    return this.bannerUrl;
  }

  generateBannerUrl(filename: string): string {
    switch (env.storage) {
      case 'spaces':
        return `https://${env.spaces.bucket}.nyc3.digitaloceanspaces.com/${env.spaces.projectFolder}/avatar/${filename}`;
      default:
        return `${String(env.apiUrl)}/avatar/${filename}`;
    }
  }

  getAvatar(): string | undefined {
    return this.avatar;
  }

  getAvatarUrl(): string | undefined {
    return this.avatarUrl;
  }

  generateAvatarUrl(filename: string): string {
    switch (env.storage) {
      case 'spaces':
        return `https://${env.spaces.bucket}.nyc3.digitaloceanspaces.com/${env.spaces.projectFolder}/avatar/${filename}`;
      default:
        return `${String(env.apiUrl)}/avatar/${filename}`;
    }
  }

  update(ongData: UpdateOngProps, userData?: UpdateUserProps): this {
    if (userData) {
      ongData.user = this.user.update(userData);
    }
    Object.assign(this, ongData);
    this.updatedAt = new Date();
    return this;
  }

  toDto(): OngDto {
    return {
      id: this.id,
      description: this.description,
      avatar: this.avatar,
      avatarUrl: this.avatarUrl,
      banner: this.banner,
      bannerUrl: this.bannerUrl,
      cnpj: this.cnpj,
      isApproved: this.isApproved,
      user: this.user.toDto(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  toPartial(): OngPartial {
    return {
      id: this.id,
      description: this.description,
      avatar: this.avatar,
      avatarUrl: this.avatarUrl,
      banner: this.banner,
      bannerUrl: this.bannerUrl,
      cnpj: this.cnpj,
      user: this.user.toPartial(),
    };
  }
}
