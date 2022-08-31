import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { Animal, AnimalPartial } from '../models/Animal';

export interface IAnimalsRepository {
  findById: (id: string) => Promise<Animal | undefined>;
  list: () => Promise<AnimalPartial[]>;
  listAnimalsFilter: (
    filter: Filters.FilterAnimals,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<AnimalPartial>>;
  listByTypeAndOng: (
    filter: Filters.PublicOngFilter,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<AnimalPartial>>;
  listByTypeOngAndStatus: (
    filter: Filters.PrivateOngFilter,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<AnimalPartial>>;
  listByOngAndStatus: (
    filter: Filters.PrivateOngFilter,
    pagination: Pagination,
  ) => Promise<PaginatedRepositoryResponse<AnimalPartial>>;
  listOtherAnimalsByTypeAndOng: (
    filter: Filters.PublicOngFilter,
  ) => Promise<AnimalPartial[]>;
  listPatronizeAnimalsHomepage: () => Promise<AnimalPartial[]>;
  listAdoptionAnimalsHomepage: () => Promise<AnimalPartial[]>;
  save: (pictureData: Animal) => Promise<Animal>;
  softDelete: (pictureData: Animal) => Promise<void>;
}

export namespace Filters {
  export type FilterAnimals = {
    type: string;
    species: string[];
    name?: string | undefined;
    sex: string[];
    city?: string | undefined;
    size: string[];
    minAge: number;
    maxAge: number;
  };
  export type PublicOngFilter = {
    id?: string;
    type: string;
    ongId: string;
  };
  export type PrivateOngFilter = {
    type?: string;
    ongId: string;
    isAvailable: boolean;
    name?: string;
  };
}
