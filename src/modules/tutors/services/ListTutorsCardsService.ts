import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { CreditCardDto } from '../domain/models/CreditCard';
import { ICreditCardsRepository } from '../domain/repositories/ICreditCardRepository';

@injectable()
class ListTutorsCardsService {
  constructor(
    @inject('CreditCardsRepository')
    private cardsRepository: ICreditCardsRepository,
  ) {}

  public async execute(
    tutorId: string,
  ): Promise<PaginatedRepositoryResponse<CreditCardDto>> {
    const cards = await this.cardsRepository.listByTutorId(tutorId);

    return cards;
  }
}

export { ListTutorsCardsService };
