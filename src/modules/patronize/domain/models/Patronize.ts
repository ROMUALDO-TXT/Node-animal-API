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
import {
  Signature,
  SignatureDto,
  SignaturePartial,
  SignatureProps,
} from './Signature';
import { BaseEntity } from '@shared/domain/entities/BaseEntity';

export type PatronizeStatus = 'ACTIVE' | 'INACTIVE' | 'REQUESTED';

export type PatronizeProps = {
  id?: string;
  status: PatronizeStatus;
  description: string;
  conclusionDate?: Date;
  planName: string;
  planAmount: number;
  planId: string;
  signature?: SignatureProps;
  tutor: TutorProps;
  animal: AnimalProps;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type PatronizeDto = {
  id?: string;
  status: PatronizeStatus;
  description?: string;
  conclusionDate?: Date;
  planName: string;
  planAmount: number;
  planId: string;
  signature?: SignatureDto;
  tutor: TutorDto;
  animal: AnimalDto;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type PatronizePartial = {
  id?: string;
  status: PatronizeStatus;
  description?: string;
  conclusionDate?: Date;
  planName: string;
  planAmount: number;
  planId: string;
  signature?: SignaturePartial;
  tutor: TutorPartial;
  animal: AnimalPartial;
};

export type UpdatePatronizeProps = Partial<PatronizeProps>;

export class Patronize extends BaseEntity {
  private readonly planId: string;
  private readonly planName: string;
  private readonly planAmount: number;
  private readonly description?: string;
  private conclusionDate?: Date;
  private status: PatronizeStatus;
  private signature?: Signature;
  private tutor: Tutor;
  private animal: Animal;

  constructor(props: PatronizeProps) {
    super(props);
    this.planId = props.planId;
    this.planName = props.planName;
    this.planAmount = props.planAmount;
    this.conclusionDate = props.conclusionDate;
    this.description = props.description;
    this.status = props.status;
    this.animal = new Animal(props.animal);
    this.tutor = new Tutor(props.tutor);
    if (props.signature) {
      this.signature = new Signature(props.signature);
    }
  }

  getId(): string {
    return this.id;
  }

  getPlanId(): string {
    return this.planId;
  }

  getPlanName(): string {
    return this.planName;
  }

  getPlanAmount(): number {
    return this.planAmount;
  }

  getTutor(): Tutor {
    return this.tutor;
  }

  getAnimal(): Animal {
    return this.animal;
  }

  getSignature(): Signature | undefined {
    return this.signature;
  }

  setSignature(data: SignatureProps): void {
    this.signature = new Signature(data);
  }

  getDescription(): string {
    return this.description || '';
  }

  getConclusionDate(): Date | undefined {
    return this.conclusionDate;
  }

  setConclusionDate(data?: Date): void {
    this.conclusionDate = data;
  }

  getStatus(): PatronizeStatus {
    return this.status;
  }

  setStatus(data: string): void {
    this.status = data as PatronizeStatus;
  }

  update(patronizeData: UpdatePatronizeProps): this {
    Object.assign(this, patronizeData);
    this.updatedAt = new Date();
    return this;
  }

  toDto(): PatronizeDto {
    return {
      id: this.id,
      status: this.status,
      description: this.description,
      conclusionDate: this.conclusionDate,
      planName: this.planName,
      planAmount: this.planAmount,
      planId: this.planId,
      signature: this.signature?.toDto(),
      tutor: this.tutor.toDto(),
      animal: this.animal.toDto(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  toPartial(): PatronizePartial {
    return {
      id: this.id,
      status: this.status,
      description: this.description,
      conclusionDate: this.conclusionDate,
      planName: this.planName,
      planAmount: this.planAmount,
      planId: this.planId,
      signature: this.signature?.toPartial(),
      tutor: this.tutor.toPartial(),
      animal: this.animal.toPartial(),
    };
  }
}
