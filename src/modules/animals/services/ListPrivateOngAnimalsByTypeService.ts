import { Pagination } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { ListPrivateAnimals } from '../domain/features/ListPrivateAnimals';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';

@injectable()
class ListPrivateOngAnimalsByTypeService implements ListPrivateAnimals {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute(
    { type, ongId, isAvailable, name }: ListPrivateAnimals.Input,
    { skip, take }: Pagination,
  ): Promise<ListPrivateAnimals.Output> {
    const animals = await this.animalsRepository.listByTypeOngAndStatus(
      {
        type,
        ongId,
        isAvailable,
        name,
      },
      {
        skip,
        take,
      },
    );

    return animals;
  }
}

export { ListPrivateOngAnimalsByTypeService };
