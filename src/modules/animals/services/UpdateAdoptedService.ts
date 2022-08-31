import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { UpdateAdopted } from '../domain/features/UpdateAdopted';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { IAdoptionsRepository } from '@modules/adoptions/domain/repositories/IAdoptionsRepository';

@injectable()
class UpdateAdoptedService implements UpdateAdopted {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
  ) {}

  public async execute({
    animalId,
    ongId,
    adoptionId,
  }: UpdateAdopted.Input): Promise<UpdateAdopted.Output> {
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

    animal.setAdoptionDate(new Date());

    animal.setAvailable(false);

    await this.animalsRepository.save(animal);
  }
}

export { UpdateAdoptedService };
