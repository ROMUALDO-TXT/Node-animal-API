import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import { AuthRoles } from '@config/roles';
import { Address, AddressProps } from './Address';
import { AddressDto } from '.';

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type UserDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  address?: AddressDto;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type UserPartial = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address?: AddressDto;
};

export type UpdateUserProps = Partial<UserProps>;

export class User extends BaseEntity {
  private readonly name: string;
  private readonly email: string;
  private readonly phone: string;
  private password: string;
  private role: string;
  private readonly address?: Address;
  private readonly addressDto?: AddressDto;

  constructor(props: UserProps, address?: AddressProps) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.password = props.password;
    this.role = props.role;
    if (address) {
      this.address = new Address(address);
      this.addressDto = this.address.toDto();
    }
  }
  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): User {
    this.password = password;
    return this;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getId(): string {
    return this.id;
  }

  getPhone(): string {
    return this.phone;
  }

  getRole(): AuthRoles {
    return this.role as AuthRoles;
  }

  getAddress(): Address | undefined {
    return this.address;
  }

  update({ role, ...data }: UpdateUserProps): this {
    Object.assign(this, data);
    if (role) {
      this.role = role;
    }
    this.updatedAt = new Date();
    return this;
  }

  toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      role: this.role,
      address: this.addressDto,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  toPartial(): UserPartial {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      phone: this.phone,
      address: this.addressDto,
    };
  }
}
