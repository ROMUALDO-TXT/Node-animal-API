import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import { Tutor, TutorPartial, TutorProps } from './Tutor';

export type CreditCardProps = {
  id?: string;
  name: string;
  creditCardId: string;
  last4CardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  brand: string;
  tutor: TutorProps;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type CardData = {
  creditCardId: string;
  last4CardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  brand: string;
};

export type CreditCardDto = {
  id?: string;
  name: string;
  creditCardId: string;
  last4CardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  brand: string;
  tutor: TutorPartial;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class CreditCard extends BaseEntity {
  private readonly name: string;
  private readonly creditCardId: string;
  private readonly last4CardNumber: string;
  private readonly expirationMonth: string;
  private readonly expirationYear: string;
  private readonly brand: string;
  private readonly tutor: Tutor;

  constructor(props: CreditCardProps) {
    super(props);
    this.name = props.name;
    this.creditCardId = props.creditCardId;
    this.last4CardNumber = props.last4CardNumber;
    this.expirationMonth = props.expirationMonth;
    this.expirationYear = props.expirationYear;
    this.brand = props.brand;
    this.tutor = new Tutor(props.tutor);
  }

  getName(): string {
    return this.name;
  }

  getTutor(): Tutor {
    return this.tutor;
  }

  getCardData(): CardData {
    return {
      creditCardId: this.creditCardId,
      last4CardNumber: this.last4CardNumber,
      expirationMonth: this.expirationMonth,
      expirationYear: this.expirationYear,
      brand: this.brand,
    };
  }

  toDto(): CreditCardDto {
    return {
      id: this.id,
      name: this.name,
      creditCardId: this.creditCardId,
      last4CardNumber: this.last4CardNumber,
      expirationMonth: this.expirationMonth,
      expirationYear: this.expirationYear,
      brand: this.brand,
      tutor: this.tutor.toPartial(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
