import env from '@config/env';
import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import { AnimalDto } from './Animal';

export type AnimalPictureProps = {
  id?: string;
  filename: string;
  animal?: AnimalDto;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type AnimalPictureDto = {
  id?: string;
  filename: string;
  url: string;
  animal?: AnimalDto;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type AnimalPicturePartial = {
  id?: string;
  filename: string;
  url: string;
};

export type UpdateAnimalPictureProps = Partial<AnimalPictureProps>;

export class AnimalPicture extends BaseEntity {
  private animal?: AnimalDto;
  private readonly filename: string;
  private url: string;

  constructor(props: AnimalPictureProps) {
    super(props);
    this.animal = props.animal;
    this.filename = props.filename;
    this.url = this.generateUrl(props.filename);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.filename;
  }

  getUrl(): string {
    return this.url;
  }

  generateUrl(filename: string): string {
    switch (env.storage) {
      case 'spaces':
        return `https://${env.spaces.bucket}.nyc3.digitaloceanspaces.com/${env.spaces.projectFolder}/avatar/${filename}`;
      default:
        return `${String(env.apiUrl)}/avatar/${filename}`;
    }
  }

  setAnimal(data: AnimalDto): void {
    this.animal = data;
  }

  toDto(): AnimalPictureDto {
    return {
      id: this.id,
      filename: this.filename,
      url: this.url,
      animal: this.animal,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  toPartial(): AnimalPicturePartial {
    return {
      id: this.id,
      filename: this.filename,
      url: this.url,
    };
  }
}
