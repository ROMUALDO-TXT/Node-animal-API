import AppError from '@shared/errors/AppError';
import { IOngsRepository } from '@modules/ongs/domain/repositories/IOngsRepository';
import { inject, injectable } from 'tsyringe';
import { CreateAnimal } from '../domain/features/CreateAnimal';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';
import { AnimalPicture } from '../domain/models/AnimalPicture';
import {
  Animal,
  AnimalSex,
  AnimalSize,
  AnimalType,
} from '../domain/models/Animal';
import { OngProps } from '@modules/ongs/domain/models/Ong';
import { IAnimalPicturesRepository } from '../domain/repositories/IAnimalPicturesRepository';

@injectable()
class CreateAnimalService implements CreateAnimal {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
    @inject('AnimalPicturesRepository')
    private animalPicturesRepository: IAnimalPicturesRepository,
  ) {}

  public async execute({
    type,
    name,
    description,
    bornDate,
    shelterEnterDate,
    sex,
    size,
    species,
    costsDescription,
    monthlyCosts,
    ongId,
    picturesFilenames,
  }: CreateAnimal.Input): Promise<CreateAnimal.Output> {
    const ong = await this.ongsRepository.findById(ongId);

    if (!ong) throw new AppError('Ong not found.');

    if (!picturesFilenames)
      throw new AppError('At least one picture is required');

    const isAvailable = true;
    if (type === 'Adoption' || type === 'Patronize') {
      let animal: Animal;
      if (type === 'Adoption') {
        animal = new Animal({
          type: type as AnimalType,
          sex: sex as AnimalSex,
          size: size as AnimalSize,
          name,
          description,
          bornDate,
          shelterEnterDate,
          species,
          isAvailable,
          ong: ong.toDto() as OngProps,
        });
      } else {
        animal = new Animal({
          type: type as AnimalType,
          sex: sex as AnimalSex,
          size: size as AnimalSize,
          name,
          description,
          bornDate,
          shelterEnterDate,
          species,
          isAvailable,
          monthlyCosts,
          costsDescription,
          ong: ong.toDto() as OngProps,
        });
      }

      animal = await this.animalsRepository.save(animal);

      const pictures: AnimalPicture[] = [];

      const animalDto = animal.toDto();

      picturesFilenames.forEach(p => {
        pictures.push(new AnimalPicture({ filename: p, animal: animalDto }));
      });

      const promises = pictures.map(pic =>
        this.animalPicturesRepository.save(pic),
      );

      const result = await Promise.all(promises);

      animal.picturesAssign(result);
      return animal.toPartial();
    } else {
      throw new AppError('Invalid requisition.');
    }
  }
}

export { CreateAnimalService };
