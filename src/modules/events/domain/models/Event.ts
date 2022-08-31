import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import {
  Address,
  AddressDto,
  AddressProps,
} from '@modules/users/domain/models/Address';
import {
  Ong,
  OngDto,
  OngPartial,
  OngProps,
} from '@modules/ongs/domain/models/Ong';
import env from '@config/env';

export type EventProps = {
  id?: string;
  name: string;
  email: string;
  description: string;
  phone: string;
  type: string;
  date: Date;
  picture: string;
  isApproved: boolean;
  ong: OngProps;
  address: AddressProps;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type EventDto = {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  type: string;
  date: Date;
  picture: string;
  isApproved: boolean;
  address: AddressDto;
  ong: OngDto;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type EventPartial = {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  type: string;
  date: Date;
  picture: string;
  isApproved: boolean;
  address?: AddressDto;
  ong: OngPartial;
};

export type UpdateEventProps = Partial<EventProps>;

export class Event extends BaseEntity {
  private readonly name: string;
  private readonly description: string;
  private readonly email: string;
  private readonly phone: string;
  private readonly type: string;
  private readonly date: Date;
  private readonly picture: string;
  private isApproved: boolean;
  private ong: Ong;
  private readonly address: AddressDto;

  constructor(props: EventProps) {
    super(props);
    this.name = props.name;
    this.description = props.description;
    this.email = props.email;
    this.phone = props.phone;
    this.type = props.type;
    this.date = props.date;
    this.picture = props.picture;
    this.isApproved = props.isApproved;
    this.ong = new Ong(props.ong);
    this.address = new Address(props.address).toDto();
  }
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getDescription(): string {
    return this.description;
  }

  getPhone(): string {
    return this.phone;
  }

  getType(): string {
    return this.type;
  }

  getDate(): Date {
    return this.date;
  }

  getPicture(): string {
    return this.picture;
  }

  generatePictureUrl(filename: string): string {
    switch (env.storage) {
      case 'spaces':
        return `https://${env.spaces.bucket}.nyc3.digitaloceanspaces.com/${env.spaces.projectFolder}/avatar/${filename}`;
      default:
        return `${String(env.apiUrl)}/avatar/${filename}`;
    }
  }

  getApproved(): boolean {
    return this.isApproved;
  }

  setApproved(data: boolean): void {
    this.isApproved = data;
  }

  getAddress(): AddressDto {
    return this.address;
  }

  getOng(): Ong {
    return this.ong;
  }

  update(data: UpdateEventProps): this {
    Object.assign(this, data);
    this.updatedAt = new Date();
    return this;
  }

  toDto(): EventDto {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      email: this.email,
      phone: this.phone,
      type: this.type,
      picture: this.picture,
      date: this.date,
      isApproved: this.isApproved,
      ong: this.ong.toDto(),
      address: this.address,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  toPartial(): EventPartial {
    return {
      id: this.id,
      description: this.description,
      email: this.email,
      name: this.name,
      phone: this.phone,
      type: this.type,
      picture: this.picture,
      date: this.date,
      isApproved: this.isApproved,
      ong: this.ong.toPartial(),
      address: this.address,
    };
  }
}
