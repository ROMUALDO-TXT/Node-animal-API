import { BaseEntity } from '@shared/domain/entities/BaseEntity';

export type AddressProps = {
  id?: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement?: string;
  zipcode: string;
};

export type AddressDto = {
  id?: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement?: string;
  zipcode: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type UpdateAddressProps = Partial<AddressProps>;

export class Address extends BaseEntity {
  private readonly state: string;
  private readonly city: string;
  private readonly district: string;
  private readonly street: string;
  private readonly number: string;
  private readonly complement?: string;
  private readonly zipcode: string;

  constructor(props: AddressProps) {
    super(props);
    this.state = props.state;
    this.city = props.city;
    this.district = props.district;
    this.street = props.street;
    this.number = props.number;
    this.complement = props.complement;
    this.zipcode = props.zipcode;
  }

  update(data: UpdateAddressProps): this {
    Object.assign(this, data);
    this.updatedAt = new Date();
    return this;
  }

  toDto(): AddressDto {
    return {
      id: this.id,
      state: this.state,
      city: this.city,
      district: this.district,
      street: this.street,
      number: this.number,
      complement: this.complement,
      zipcode: this.zipcode,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
