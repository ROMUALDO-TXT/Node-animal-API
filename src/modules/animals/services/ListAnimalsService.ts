import { inject, injectable } from 'tsyringe';
import { AnimalPartial } from '../domain/models/Animal';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';

@injectable()
class ListAnimalService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute(): Promise<AnimalPartial[]> {
    const animals = await this.animalsRepository.list();

    return animals;
  }
}

export { ListAnimalService };
