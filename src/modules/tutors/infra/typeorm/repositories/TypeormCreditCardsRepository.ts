import {
  CreditCard,
  CreditCardDto,
  CreditCardProps,
} from '@modules/tutors/domain/models/CreditCard';
import { ICreditCardsRepository } from '@modules/tutors/domain/repositories/ICreditCardRepository';
import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CreditCard as CardDb } from '../entities/CreditCard';
import { CreditCardMapper } from '../mappers/CreditCardMapper';

@EntityRepository(CardDb)
class CreditCardsRepository implements ICreditCardsRepository {
  private readonly ormRepository: Repository<CardDb>;

  constructor() {
    this.ormRepository = getRepository(CardDb);
  }

  public async listByTutorId(
    tutorId: string,
  ): Promise<PaginatedRepositoryResponse<CreditCardDto>> {
    const [cardData, count] = await this.ormRepository.findAndCount({
      join: {
        alias: 'card',
        leftJoinAndSelect: {
          tutor: 'card.tutor',
          user: 'tutor.user',
        },
      },
      where: {
        tutor: {
          id: tutorId,
        },
      },
      order: {
        createdAt: 'ASC',
      },
    });

    return {
      numberOfItens: count,
      itens: CreditCardMapper.mapMany(cardData),
    };
  }

  public async findByTutorAndId(
    creditCardId: string,
    tutorId: string,
  ): Promise<CreditCard | undefined> {
    const cardData = await this.ormRepository.findOne({
      join: {
        alias: 'card',
        leftJoinAndSelect: {
          tutor: 'card.tutor',
          user: 'tutor.user',
        },
      },
      where: {
        creditCardId,
        tutor: {
          id: tutorId,
        },
      },
    });

    let card: CreditCard | undefined;
    if (cardData) {
      card = new CreditCard(cardData as unknown as CreditCardProps);
    }

    return card;
  }

  public async save(cardData: CreditCard): Promise<CreditCard> {
    const dto = cardData.toDto();
    const cardDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(cardDb);

    return new CreditCard(cardDb as unknown as CreditCardProps);
  }

  public async softDelete(data: CreditCard): Promise<void> {
    const dto = data.toDto();

    const cardDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(cardDb);
  }
}
export { CreditCardsRepository };
