import { IOngsRepository } from '@modules/ongs/domain/repositories/IOngsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';

interface IRequest {
  id: string;
  ongId: string;
}

@injectable()
class DeleteAnimalService {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
  ) {}

  public async execute({ id, ongId }: IRequest): Promise<void> {
    const animal = await this.animalsRepository.findById(id);
    const ong = await this.ongsRepository.findById(ongId);

    if (!animal) throw new AppError('Animal not found.');

    if (animal.getOng() === ong) {
      await this.animalsRepository.softDelete(animal);
    } else {
      throw new AppError("Your ong can't edit this animal.");
    }
  }
}

export { DeleteAnimalService };
