import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import { Ong, OngDto, OngPartial, OngProps } from './Ong';

export type documentType = 'CPF' | 'CNPJ';

export type BankAccountProps = {
  id?: string;
  name: string;
  documentType: documentType;
  document: string;
  bankNumber: number;
  agencyNumber: number;
  accountNumber: number;
  accountType: string;
  ong: OngProps;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type AccountData = {
  bankNumber: number;
  agencyNumber: number;
  accountNumber: number;
  accountType: string;
};

export type BankAccountDto = {
  id: string;
  name: string;
  documentType: documentType;
  document: string;
  bankNumber: number;
  agencyNumber: number;
  accountNumber: number;
  accountType: string;
  ong: OngDto;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type BankAccountPartial = {
  id: string;
  name: string;
  bankNumber: number;
  agencyNumber: number;
  accountNumber: number;
  accountType: string;
  ong: OngPartial;
};

export class BankAccount extends BaseEntity {
  private readonly name: string;
  private readonly bankNumber: number;
  private readonly agencyNumber: number;
  private readonly accountNumber: number;
  private readonly accountType: string;
  private readonly documentType: documentType;
  private readonly document: string;
  private readonly ong: Ong;

  constructor(props: BankAccountProps) {
    super(props);
    this.name = props.name;
    this.bankNumber = props.bankNumber;
    this.agencyNumber = props.agencyNumber;
    this.accountNumber = props.accountNumber;
    this.accountType = props.accountType;
    this.documentType = props.documentType;
    this.document = props.document;
    this.ong = new Ong(props.ong);
  }

  getOng(): Ong {
    return this.ong;
  }

  getName(): string {
    return this.name;
  }
  getDocument(): string {
    return this.document;
  }
  getDocumentType(): documentType {
    return this.documentType;
  }

  toDto(): BankAccountDto {
    return {
      id: this.id,
      ong: this.ong.toDto(),
      name: this.name,
      documentType: this.documentType,
      document: this.document,
      bankNumber: this.bankNumber,
      agencyNumber: this.agencyNumber,
      accountNumber: this.accountNumber,
      accountType: this.accountType,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  toPartial(): BankAccountPartial {
    return {
      id: this.id,
      name: this.name,
      bankNumber: this.bankNumber,
      agencyNumber: this.agencyNumber,
      accountNumber: this.accountNumber,
      accountType: this.accountType,
      ong: this.ong.toPartial(),
    };
  }
}
