import { BaseEntity } from '@shared/domain/entities/BaseEntity';
import {
  Ong,
  OngDto,
  OngPartial,
  OngProps,
} from '@modules/ongs/domain/models/Ong';
import {
  AnimalPicture,
  AnimalPicturePartial,
  AnimalPictureProps,
} from './AnimalPicture';

export type AnimalSex = 'Male' | 'Female';

export type AnimalSize = 'P' | 'M' | 'G';

export type AnimalType = 'Adoption' | 'Patronize';

export type AnimalProps = {
  id?: string;
  name: string;
  description?: string;
  bornDate: Date;
  shelterEnterDate: Date;
  sex: AnimalSex;
  size: AnimalSize;
  species: string;
  type: AnimalType;
  costsDescription?: string;
  monthlyCosts?: number;
  isAvailable: boolean;
  adoptionDate?: Date;
  ong: OngProps;
  pictures?: AnimalPictureProps[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type AnimalDto = {
  id?: string;
  name: string;
  description?: string;
  bornDate: Date;
  shelterEnterDate: Date;
  sex: AnimalSex;
  size: AnimalSize;
  species: string;
  type: AnimalType;
  costsDescription?: string;
  monthlyCosts?: number;
  isAvailable: boolean;
  adoptionDate?: Date;
  ong: OngDto;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type AnimalPartial = {
  id?: string;
  name: string;
  description?: string;
  bornDate: Date;
  shelterEnterDate: Date;
  sex: AnimalSex;
  size: AnimalSize;
  species: string;
  type: AnimalType;
  costsDescription?: string;
  monthlyCosts?: number;
  isAvailable: boolean;
  adoptionDate?: Date;
  pictures: AnimalPicturePartial[];
  ong: OngPartial;
};

export type UpdateAnimalProps = Partial<AnimalProps>;

export class Animal extends BaseEntity {
  private readonly name: string;
  private readonly description?: string;
  private readonly bornDate: Date;
  private readonly shelterEnterDate: Date;
  private readonly sex: AnimalSex;
  private readonly size: AnimalSize;
  private readonly species: string;
  private readonly type: AnimalType;
  private readonly costsDescription?: string;
  private readonly monthlyCosts?: number;
  private isAvailable: boolean;
  private adoptionDate?: Date;
  private ong: Ong;
  private pictures: AnimalPicture[];

  constructor(props: AnimalProps) {
    super(props);
    this.name = props.name;
    this.description = props.description;
    this.bornDate = props.bornDate;
    this.shelterEnterDate = props.shelterEnterDate;
    this.sex = props.sex;
    this.size = props.size;
    this.species = props.species;
    this.type = props.type;
    this.costsDescription = props.costsDescription;
    this.monthlyCosts = props.monthlyCosts;
    this.isAvailable = props.isAvailable;
    this.adoptionDate = props.adoptionDate;
    this.ong = new Ong(props.ong);
    this.pictures = [];
    if (props.pictures) {
      this.picturesAssign(props.pictures);
    }
  }

  picturesAssign(data: AnimalPictureProps[]) {
    data.forEach(p => {
      Object.assign(p, { animal: this.toDto() });
      this.pictures.push(new AnimalPicture(p));
    });
  }

  getId(): string {
    return this.id;
  }

  getOng(): Ong {
    return this.ong;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description || '';
  }

  getBornDate(): Date {
    return this.bornDate;
  }

  getShelterEnterDate(): Date {
    return this.shelterEnterDate;
  }

  getSex(): AnimalSex {
    return this.sex;
  }

  getSize(): AnimalSize {
    return this.size;
  }

  getSpecies(): string {
    return this.size;
  }

  getType(): AnimalType {
    return this.type;
  }

  getPictures(): AnimalPicture[] {
    return this.pictures;
  }

  setPictures(data: AnimalPicture[]): void {
    this.pictures = data;
  }

  getCostsDescription(): string | undefined {
    return this.costsDescription;
  }

  getMonthlyCosts(): number | undefined {
    return this.monthlyCosts;
  }

  getAvailable(): boolean {
    return this.isAvailable;
  }

  setAvailable(data: boolean): void {
    this.isAvailable = data;
  }

  getAdoptionDate(): Date | undefined {
    return this.adoptionDate;
  }

  setAdoptionDate(data: Date | undefined): void {
    this.adoptionDate = data;
  }

  update(animalData: UpdateAnimalProps): this {
    Object.assign(this, animalData);
    this.pictures.splice(0, this.pictures.length);
    this.updatedAt = new Date();
    return this;
  }

  toDto(): AnimalDto {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      bornDate: this.bornDate,
      shelterEnterDate: this.shelterEnterDate,
      sex: this.sex,
      size: this.size,
      species: this.species,
      type: this.type,
      costsDescription: this.costsDescription,
      monthlyCosts: this.monthlyCosts,
      isAvailable: this.isAvailable,
      adoptionDate: this.adoptionDate,
      ong: this.ong.toDto(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  toPartial(): AnimalPartial {
    const picturesPartial: AnimalPicturePartial[] = [];
    this.pictures.forEach(p => picturesPartial.push(p.toPartial()));

    return {
      id: this.id,
      name: this.name,
      description: this.description,
      bornDate: this.bornDate,
      shelterEnterDate: this.shelterEnterDate,
      sex: this.sex,
      size: this.size,
      species: this.species,
      type: this.type,
      costsDescription: this.costsDescription,
      monthlyCosts: this.monthlyCosts,
      isAvailable: this.isAvailable,
      adoptionDate: this.adoptionDate,
      pictures: picturesPartial,
      ong: this.ong.toPartial(),
    };
  }
}
