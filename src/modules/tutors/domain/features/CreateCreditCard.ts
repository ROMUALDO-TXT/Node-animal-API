import { CreditCardDto } from '../models/CreditCard';

export interface CreateCreditCard {
  execute: (data: CreateCreditCard.Input) => Promise<CreateCreditCard.Output>;
}

export namespace CreateCreditCard {
  export type Input = {
    tutorId: string;
    name: string;
    creditCardId: string;
    last4CardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    brand: string;
  };

  export type Output = CreditCardDto;
}
