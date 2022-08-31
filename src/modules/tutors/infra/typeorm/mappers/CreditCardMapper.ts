import {
  CreditCard,
  CreditCardDto,
} from '@modules/tutors/domain/models/CreditCard';
import { CreditCard as CreditCardDb } from '../entities/CreditCard';

export class CreditCardMapper {
  static mapOne(data: CreditCardDb): CreditCardDto {
    return new CreditCard({
      id: data.id,
      name: data.name,
      creditCardId: data.creditCardId,
      last4CardNumber: data.last4CardNumber,
      expirationMonth: data.expirationMonth,
      expirationYear: data.expirationYear,
      brand: data.brand,
      tutor: data.tutor,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    }).toDto();
  }

  static mapMany(creditCardsDb: CreditCardDb[]): CreditCardDto[] {
    return creditCardsDb.map(this.mapOne);
  }
}
