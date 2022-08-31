import { DeleteResult } from 'typeorm';
import {
  AnimalPicture,
  AnimalPicturePartial,
  AnimalPictureProps,
} from '../models/AnimalPicture';

export interface IAnimalPicturesRepository {
  findByAnimalId: (
    animalId: string,
  ) => Promise<AnimalPicturePartial[] | undefined>;
  save: (pictureData: AnimalPicture) => Promise<AnimalPictureProps>;
  delete: (pictureData: AnimalPicture) => Promise<DeleteResult>;
}
