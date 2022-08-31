import { Pagination } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { ListFilterAnimal } from '../domain/features/ListFilterAnimal';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';

@injectable()
class ListFilterAnimalService implements ListFilterAnimal {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute(
    data: ListFilterAnimal.Input,
    pagination: Pagination,
  ): Promise<ListFilterAnimal.Output> {
    const animals = await this.animalsRepository.listAnimalsFilter(
      data,
      pagination,
    );

    return animals;
  }
}

export { ListFilterAnimalService };
