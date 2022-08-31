import {
  Animal,
  AnimalDto,
  AnimalPartial,
  AnimalProps,
} from '@modules/animals/domain/models/Animal';
import {
  Tutor,
  TutorDto,
  TutorPartial,
  TutorProps,
} from '@modules/tutors/domain/models/Tutor';
import { BaseEntity } from '@shared/domain/entities/BaseEntity';

export type AdoptionStatus =
  | 'Solicitado'
  | 'Em analise'
  | 'Aprovado'
  | 'Negado'
  | 'Cancelado';

export type AdoptionProps = {
  id?: string;
  description?: string;
  requestDate: Date;
  conclusionDate?: Date;
  status: AdoptionStatus;
  tutor: TutorProps;
  animal: AnimalProps;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type AdoptionDto = {
  id?: string;
  description?: string;
  requestDate: Date;
  conclusionDate?: Date;
  status: AdoptionStatus;
  tutor: TutorDto;
  animal: AnimalDto;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type AdoptionPartial = {
  id?: string;
  description?: string;
  requestDate: Date;
  conclusionDate?: Date;
  status: AdoptionStatus;
  tutor: TutorPartial;
  animal: AnimalPartial;
};

export type UpdateAdoptionProps = Partial<AdoptionProps>;

export class Adoption extends BaseEntity {
  private readonly description?: string;
  private readonly requestDate: Date;
  private conclusionDate?: Date;
  private status: AdoptionStatus;
  private tutor: Tutor;
  private animal: Animal;

  constructor(props: AdoptionProps) {
    super(props);
    this.requestDate = props.requestDate;
    this.conclusionDate = props.conclusionDate;
    this.description = props.description;
    this.status = props.status;
    this.animal = new Animal(props.animal);
    this.tutor = new Tutor(props.tutor);
  }

  getId(): string {
    return this.id;
  }

  getTutor(): Tutor {
    return this.tutor;
  }

  getAnimal(): Animal {
    return this.animal;
  }

  getDescription(): string {
    return this.description || '';
  }

  getRequestDate(): Date {
    return this.requestDate;
  }

  getConclusionDate(): Date | undefined {
    return this.conclusionDate;
  }

  setConclusionDate(data?: Date): void {
    this.conclusionDate = data;
  }

  getStatus(): AdoptionStatus {
    return this.status;
  }

  setStatus(data: string): void {
    this.status = data as AdoptionStatus;
  }

  update(animalData: UpdateAdoptionProps): this {
    Object.assign(this, animalData);
    this.updatedAt = new Date();
    return this;
  }

  toDto(): AdoptionDto {
    return {
      id: this.id,
      description: this.description,
      requestDate: this.requestDate,
      conclusionDate: this.conclusionDate,
      status: this.status,
      tutor: this.tutor.toDto(),
      animal: this.animal.toDto(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  toPartial(): AdoptionPartial {
    return {
      id: this.id,
      description: this.description,
      requestDate: this.requestDate,
      conclusionDate: this.conclusionDate,
      status: this.status,
      tutor: this.tutor.toPartial(),
      animal: this.animal.toPartial(),
    };
  }
}
