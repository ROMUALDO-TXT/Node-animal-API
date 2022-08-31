import DiskStorageProvider from '@shared/container/providers/storageProviders/DiskStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import { UpdateAnimal } from '../domain/features/UpdateAnimal';
import { AnimalSex, AnimalSize } from '../domain/models/Animal';
import {
  AnimalPicture,
  AnimalPictureProps,
} from '../domain/models/AnimalPicture';
import { IAnimalPicturesRepository } from '../domain/repositories/IAnimalPicturesRepository';
import { IAnimalsRepository } from '../domain/repositories/IAnimalsRepository';

@injectable()
class UpdateAnimalService implements UpdateAnimal {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
    @inject('AnimalPicturesRepository')
    private animalPicturesRepository: IAnimalPicturesRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
    bornDate,
    sex,
    size,
    species,
    shelterEnterDate,
    ongId,
    costsDescription,
    monthlyCosts,
    picturesFilenames,
  }: UpdateAnimal.Input): Promise<UpdateAnimal.Output> {
    const animal = await this.animalsRepository.findById(id);

    if (!animal) throw new AppError('Animal not found.');

    if (ongId && animal.getOng().getId() !== ongId) {
      throw new AppError('This animal does not belong to this ong.');
    }

    const animalDto = animal.toDto();

    const updateAnimal = {
      id: animalDto.id,
      type: animalDto.type,
      name: name ?? animalDto.name,
      description: description ?? animalDto.description,
      bornDate: bornDate ?? animalDto.bornDate,
      sex: (sex as AnimalSex) ?? animalDto.sex,
      size: (size as AnimalSize) ?? animalDto.size,
      species: species ?? animalDto.species,
      shelterEnterDate: shelterEnterDate ?? animalDto.shelterEnterDate,
      ongId: animalDto.ong.id,
      costsDescription: costsDescription ?? animalDto.costsDescription,
      monthlyCosts: monthlyCosts ?? animalDto.monthlyCosts,
      isAvailable: animalDto.isAvailable,
    };
    let result: AnimalPictureProps[] = [];
    if (picturesFilenames) {
      const diskProvider = new DiskStorageProvider();
      const deletePicturePromises: Promise<DeleteResult>[] = [];
      const deleteFilePromises: Promise<void>[] = [];
      const pictures = animal.getPictures();

      pictures.forEach(picture => {
        deleteFilePromises.push(diskProvider.deleteFile(picture.getName()));
        deletePicturePromises.push(
          this.animalPicturesRepository.delete(picture),
        );
      });

      await Promise.all(deleteFilePromises);
      await Promise.all(deletePicturePromises);

      pictures.splice(0, pictures.length);

      const pictureProps: AnimalPictureProps[] = [];

      picturesFilenames.forEach(p =>
        pictureProps.push({ filename: p, animal: animalDto }),
      );

      pictureProps.forEach(p => {
        pictures.push(new AnimalPicture(p));
      });

      const promises = pictures.map(pic =>
        this.animalPicturesRepository.save(pic),
      );

      result = await Promise.all(promises);
    }

    animal.update(updateAnimal);

    const updatedAnimal = await this.animalsRepository.save(animal);
    if (result) {
      updatedAnimal.picturesAssign(result);
    }
    return updatedAnimal.toPartial();
  }
}

export { UpdateAnimalService };
