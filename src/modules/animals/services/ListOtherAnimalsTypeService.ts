import { inject, injectable } from 'tsyringe';
import { AnimalPartial } from '../domain/models/Animal';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';

interface IRequest {
  id: string;
  type: string;
  ongId: string;
}

@injectable()
class ListOtherAnimalsTypeService {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({
    id,
    type,
    ongId,
  }: IRequest): Promise<AnimalPartial[]> {
    const animals = await this.animalsRepository.listOtherAnimalsByTypeAndOng({
      id,
      type,
      ongId,
    });

    return animals;
  }
}

export { ListOtherAnimalsTypeService };
