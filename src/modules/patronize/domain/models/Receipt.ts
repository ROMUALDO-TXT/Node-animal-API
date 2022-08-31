import {
  BankAccount,
  BankAccountDto,
  BankAccountPartial,
  BankAccountProps,
} from '@modules/ongs/domain/models/BankAccount';
import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import {
  Patronize,
  PatronizeDto,
  PatronizePartial,
  PatronizeProps,
} from './Patronize';

export type AdoptionProps = {
  id: string;
  description: string;
  creationDate: Date;
  transferDate: Date;
  status: string;
  patronize: PatronizeProps;
  account: BankAccountProps;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type AdoptionDto = {
  id: string;
  description: string;
  creationDate: Date;
  transferDate: Date;
  status: string;
  patronize: PatronizeDto;
  account: BankAccountDto;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type AdoptionPartial = {
  id: string;
  description: string;
  creationDate: Date;
  transferDate: Date;
  status: string;
  patronize: PatronizePartial;
  account: BankAccountPartial;
};

export type UpdateAdoptionProps = Partial<AdoptionProps>;

export class Adoption extends BaseEntity {
  private readonly description: string;
  private readonly creationDate: Date;
  private readonly transferDate: Date;
  private status: string;
  private patronize: Patronize;
  private account: BankAccount;

  constructor(props: AdoptionProps) {
    super(props);
    this.creationDate = props.creationDate;
    this.transferDate = props.transferDate;
    this.description = props.description;
    this.status = props.status;
    this.patronize = new Patronize(props.patronize);
    this.account = new BankAccount(props.account);
  }

  getId(): string {
    return this.id;
  }

  getPatronize(): Patronize {
    return this.patronize;
  }

  getBankAccount(): BankAccount {
    return this.account;
  }

  getDescription(): string {
    return this.description || '';
  }

  getStatus(): string {
    return this.status;
  }

  setStatus(data: string): void {
    this.status = data;
  }

  update(accountData: UpdateAdoptionProps): this {
    Object.assign(this, accountData);
    this.updatedAt = new Date();
    return this;
  }

  toDto(): AdoptionDto {
    return {
      id: this.id,
      description: this.description,
      creationDate: this.creationDate,
      transferDate: this.transferDate,
      status: this.status,
      patronize: this.patronize.toDto(),
      account: this.account.toDto(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  toPartial(): AdoptionPartial {
    return {
      id: this.id,
      description: this.description,
      creationDate: this.creationDate,
      transferDate: this.transferDate,
      status: this.status,
      patronize: this.patronize.toPartial(),
      account: this.account.toPartial(),
    };
  }
}
