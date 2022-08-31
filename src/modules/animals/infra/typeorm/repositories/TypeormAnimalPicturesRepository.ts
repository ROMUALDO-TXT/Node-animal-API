import {
  AnimalPicture,
  AnimalPicturePartial,
  AnimalPictureProps,
} from '@modules/animals/domain/models/AnimalPicture';
import { IAnimalPicturesRepository } from '@modules/animals/domain/repositories/IAnimalPicturesRepository';
import {
  DeleteResult,
  EntityRepository,
  getRepository,
  Repository,
} from 'typeorm';
import { AnimalPictures as PicturesDb } from '../entities/AnimalPicture';
import { AnimalPicturesMappers } from '../mappers/AnimalPictureMappers';

@EntityRepository(PicturesDb)
class AnimalPicturesRepository implements IAnimalPicturesRepository {
  private readonly ormRepository: Repository<PicturesDb>;

  constructor() {
    this.ormRepository = getRepository(PicturesDb);
  }

  public async findByAnimalId(
    animalId: string,
  ): Promise<AnimalPicturePartial[]> {
    const picturesData = await this.ormRepository.find({
      join: {
        alias: 'picture',
        leftJoinAndSelect: {
          animal: 'picture.animal',
        },
      },
      where: {
        animal: {
          id: animalId,
        },
      },
    });

    return AnimalPicturesMappers.mapMany(picturesData);
  }

  public async save(pictureData: AnimalPicture): Promise<AnimalPictureProps> {
    const dto = pictureData.toDto();
    const pictureDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(pictureDb);

    return pictureDb as unknown as AnimalPictureProps;
  }

  public async delete(data: AnimalPicture): Promise<DeleteResult> {
    const dto = data.toDto();

    const pictureDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });
    return await this.ormRepository.delete(pictureDb);
  }
}

export { AnimalPicturesRepository };
