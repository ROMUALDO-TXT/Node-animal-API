import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { CancelAdoption } from '../domain/features/CancelAdoption';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';

@injectable()
class CancelAdoptionService implements CancelAdoption {
  constructor(
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
  ) {}

  public async execute({
    tutorId,
    adoptionId,
  }: CancelAdoption.Input): Promise<CancelAdoption.Output> {
    const adoption = await this.adoptionsRepository.findById(adoptionId);

    if (!adoption) throw new AppError('Adoption not found.');

    if (adoption.getTutor().getId() !== tutorId)
      throw new AppError('This adoption does not belong to this tutor');

    adoption.setConclusionDate(new Date());
    adoption.setStatus('Cancelado');

    await this.adoptionsRepository.save(adoption);

    return adoption.toPartial();
  }
}

export { CancelAdoptionService };
