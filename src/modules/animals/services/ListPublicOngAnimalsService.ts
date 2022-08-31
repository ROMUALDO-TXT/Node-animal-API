import { Pagination } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { ListPublicAnimals } from '../domain/features/ListPublicAnimals';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';

//For Ong profile page
@injectable()
class ListPublicOngAnimalsService implements ListPublicAnimals {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute(
    { type, ongId }: ListPublicAnimals.Input,
    { skip, take }: Pagination,
  ): Promise<ListPublicAnimals.Output> {
    const animals = await this.animalsRepository.listByTypeAndOng(
      { type, ongId },
      { skip, take },
    );

    return animals;
  }
}

export { ListPublicOngAnimalsService };
