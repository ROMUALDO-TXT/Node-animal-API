import { TutorPartial } from '@modules/tutors/domain/models/Tutor';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { Adoption, AdoptionPartial } from '../models/Adoption';

export interface IAdoptionsRepository {
  findByTutorAndAnimalId: (
    tutorId: string,
    animalId: string,
  ) => Promise<Adoption | undefined>;
  findByAnimalId: (animalId: string) => Promise<Adoption | undefined>;
  findById: (id: string) => Promise<Adoption | undefined>;
  listOpenAdoptionsByOng: (
    ongId: string,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<AdoptionPartial>>;
  listTutorsByAnimalId: (
    ongId: string,
    animalId: string,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<TutorPartial>>;
  save: (adoptionData: Adoption) => Promise<Adoption>;
  softDelete: (adoptionData: Adoption) => Promise<void>;
}
