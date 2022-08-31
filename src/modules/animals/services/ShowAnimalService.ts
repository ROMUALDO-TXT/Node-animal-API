import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ShowAnimal } from '../domain/features/ShowAnimal';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';

@injectable()
class ShowAnimalService implements ShowAnimal {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({ id }: ShowAnimal.Input): Promise<ShowAnimal.Output> {
    const animal = await this.animalsRepository.findById(id);

    if (!animal) throw new AppError('Animal not found.');

    const animalDto = animal.toDto();

    return {
      id: animalDto.id,
      name: animalDto.name,
      description: animalDto.description,
      bornDate: animalDto.bornDate,
      shelterEnterDate: animalDto.shelterEnterDate,
      sex: animalDto.sex,
      size: animalDto.size,
      species: animalDto.species,
      type: animalDto.type,
      costsDescription: animalDto.costsDescription,
      monthlyCosts: animalDto.monthlyCosts,
      isAvailable: animalDto.isAvailable,
      adoptionDate: animalDto.adoptionDate,
      ongName: animalDto.ong.user.name,
      ongAvatar: animalDto.ong.avatarUrl,
      pictures: animalDto.pictures,
    };
  }
}

export { ShowAnimalService };
