import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { DeleteRequirement } from '../domain/features/DeleteRequirement';
import { IPatronizesRepository } from '../domain/repositories/IPatronizesRepository';

@injectable()
class DeleteRequirementService implements DeleteRequirement {
  constructor(
    @inject('PatronizesRepository')
    private patronizesRepository: IPatronizesRepository,
  ) {}

  public async execute({
    tutorId,
    patronizeId,
  }: DeleteRequirement.Input): Promise<DeleteRequirement.Output> {
    const patronize = await this.patronizesRepository.findById(patronizeId);

    if (!patronize) throw new AppError('Patronizing requirement not found');

    if (tutorId !== patronize.getTutor().getId()) {
      throw new AppError(
        'This patronizing requirement does not belong to this tutor',
      );
    }

    await this.patronizesRepository.softDelete(patronize);
  }
}

export { DeleteRequirementService };
