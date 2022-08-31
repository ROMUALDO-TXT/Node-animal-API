import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import {
  AddressProps,
  UpdateUserProps,
  User,
  UserDto,
  UserPartial,
  UserProps,
} from '@modules/users/domain/models';
import env from '@config/env';

export type TutorProps = {
  id?: string;
  description: string;
  avatar: string;
  avatarUrl?: string;
  banner: string;
  bannerUrl?: string;
  adoptionRequirements: number;
  cpf: string;
  user: UserProps;
  address?: AddressProps | undefined;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type UpdateTutorProps = {
  id?: string;
  description?: string;
  avatar?: string;
  avatarUrl?: string;
  banner?: string;
  bannerUrl?: string;
  adoptionRequirements?: number;
  cpf?: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type TutorDto = {
  id: string;
  description: string;
  avatar: string | undefined;
  avatarUrl: string | undefined;
  banner: string | undefined;
  bannerUrl: string | undefined;
  adoptionRequirements: number;
  cpf: string;
  user: UserDto;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type TutorPartial = {
  id: string;
  avatar: string;
  banner: string;
  user: UserPartial;
};

export class Tutor extends BaseEntity {
  private readonly description: string;
  private readonly cpf: string;
  private readonly avatar: string;
  private readonly avatarUrl?: string;
  private readonly banner: string;
  private readonly bannerUrl?: string;
  private adoptionRequirements: number;
  private user: User;

  constructor(props: TutorProps) {
    super(props);
    this.cpf = props.cpf;
    this.description = props.description;
    this.avatar = props.avatar;
    this.avatarUrl = props.avatarUrl;
    this.banner = props.banner;
    this.bannerUrl = props.bannerUrl;
    this.adoptionRequirements = props.adoptionRequirements;
    this.user = new User(props.user, props.address);
  }

  getId(): string {
    return this.id;
  }

  getUser(): User {
    return this.user;
  }

  setPassword(data: string) {
    this.user.setPassword(data);
  }

  setUser(data: UserDto): void {
    this.user = new User(data as UserProps);
  }

  getCpf(): string {
    return this.cpf;
  }

  getDescription(): string {
    return this.description;
  }

  getRequirements(): number {
    return this.adoptionRequirements;
  }

  setRequirement(data: number): void {
    this.adoptionRequirements = data;
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

  update(tutorData: UpdateTutorProps, userData?: UpdateUserProps): this {
    if (userData) {
      tutorData.user = this.user.update(userData);
    }
    Object.assign(this, tutorData);
    this.updatedAt = new Date();
    return this;
  }

  toDto(): TutorDto {
    return {
      id: this.id,
      description: this.description,
      avatar: this.avatar,
      avatarUrl: this.avatarUrl,
      banner: this.banner,
      bannerUrl: this.bannerUrl,
      cpf: this.cpf,
      adoptionRequirements: this.adoptionRequirements,
      user: this.user.toDto(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  toPartial(): TutorPartial {
    return {
      id: this.id,
      avatar: this.avatar,
      banner: this.banner,
      user: this.user.toPartial(),
    };
  }
}
