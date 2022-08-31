import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { CreditCard, CreditCardDto } from '../models/CreditCard';

export interface ICreditCardsRepository {
  findByTutorAndId: (
    tutorId: string,
    creditCardId: string,
  ) => Promise<CreditCard | undefined>;
  listByTutorId: (
    tutor: string,
  ) => Promise<PaginatedRepositoryResponse<CreditCardDto>>;
  save: (cardData: CreditCard) => Promise<CreditCard>;
  softDelete: (cardData: CreditCard) => Promise<void>;
}
