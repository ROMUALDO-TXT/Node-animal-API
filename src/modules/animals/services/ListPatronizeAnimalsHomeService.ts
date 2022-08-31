import { inject, injectable } from 'tsyringe';
import { AnimalPartial } from '../domain/models/Animal';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';

@injectable()
class ListAdoptionAnimalsHomeService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute(): Promise<AnimalPartial[]> {
    const animals = await this.animalsRepository.listPatronizeAnimalsHomepage();

    return animals;
  }
}

export { ListAdoptionAnimalsHomeService };
