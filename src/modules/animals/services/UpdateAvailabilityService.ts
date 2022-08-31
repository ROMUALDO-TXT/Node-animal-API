import { IAdoptionsRepository } from '@modules/adoptions/domain/repositories/IAdoptionsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { UpdateAvailability } from '../domain/features/UpdateAvailability';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';

@injectable()
class UpdateAvailabilityService implements UpdateAvailability {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
  ) {}

  public async execute({
    available,
    animalId,
    ongId,
    adoptionId,
  }: UpdateAvailability.Input): Promise<UpdateAvailability.Output> {
    const animal = await this.animalsRepository.findById(animalId);

    if (!animal) throw new AppError('Animal not found.');

    if (ongId && animal.getOng().getId() !== ongId)
      throw new AppError('This animal does not belong to this ong.');

    const adoptionExists = await this.adoptionsRepository.findByAnimalId(
      animalId,
    );
    if (adoptionExists && adoptionId && adoptionExists.id !== adoptionId) {
      throw new AppError(
        'This animal availability cannot be edited, there is an open adoption requirement for it',
      );
    }

    animal.setAvailable(available);

    await this.animalsRepository.save(animal);
  }
}

export { UpdateAvailabilityService };
