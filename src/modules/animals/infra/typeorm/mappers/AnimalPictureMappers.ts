import {
  AnimalPicture,
  AnimalPicturePartial,
} from '@modules/animals/domain/models/AnimalPicture';
import { AnimalPictures as PictureDb } from '../entities/AnimalPicture';

export class AnimalPicturesMappers {
  static mapOne(data: PictureDb): AnimalPicturePartial {
    return new AnimalPicture({
      id: data.id,
      filename: data.filename,
    }).toPartial();
  }

  static mapMany(animalPicturesDb: PictureDb[]): AnimalPicturePartial[] {
    return animalPicturesDb.map(this.mapOne);
  }
}
