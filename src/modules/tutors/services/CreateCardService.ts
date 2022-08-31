import AppError from '@shared/errors/AppError';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';
import { ITutorsRepository } from '../domain/repositories/ITutorsRepository';
import { CreateCreditCard } from '../domain/features/CreateCreditCard';
import { ICreditCardsRepository } from '../domain/repositories/ICreditCardRepository';
import { CreditCard } from '../domain/models/CreditCard';
import { TutorProps } from '../domain/models/Tutor';

@injectable()
class CreateCardService implements CreateCreditCard {
  constructor(
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
    @inject('CreditCardsRepository')
    private creditCardsRepository: ICreditCardsRepository,
  ) {}

  public async execute({
    tutorId,
    name,
    creditCardId,
    last4CardNumber,
    expirationMonth,
    expirationYear,
    brand,
  }: CreateCreditCard.Input): Promise<CreateCreditCard.Output> {
    const tutor = await this.tutorsRepository.findById(tutorId);

    if (!tutor) {
      throw new AppError('Tutor not found');
    }

    const cardExists = await this.creditCardsRepository.findByTutorAndId(
      creditCardId,
      tutorId,
    );

    if (cardExists) {
      throw new AppError('Card already exists.');
    }

    const expirationDate = dayjs()
      .set('year', Number(expirationYear))
      .set('month', Number(expirationMonth) - 1)
      .startOf('month');

    if (expirationDate.diff(new Date()) < 0) {
      throw new AppError('Expired card');
    }

    let creditCard = new CreditCard({
      tutor: tutor.toDto() as TutorProps,
      name,
      creditCardId,
      last4CardNumber,
      expirationMonth,
      expirationYear,
      brand,
    });

    creditCard = await this.creditCardsRepository.save(creditCard);

    return creditCard.toDto();
  }
}

export { CreateCardService };
