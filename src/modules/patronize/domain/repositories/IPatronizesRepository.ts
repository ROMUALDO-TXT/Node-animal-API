import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { Patronize, PatronizePartial } from '../models/Patronize';

export interface IPatronizesRepository {
  findById: (id: string) => Promise<Patronize | undefined>;
  findByTutorAndAnimalId: (
    tutorId: string,
    animalId: string,
  ) => Promise<Patronize | undefined>;

  listActivePatronizesByOng: (
    ongId: string,
    { skip, take }: Pagination,
  ) => Promise<PaginatedRepositoryResponse<PatronizePartial>>;

  findByAnimalId: (id: string) => Promise<Patronize | undefined>;

  save: (signatureData: Patronize) => Promise<Patronize>;
  softDelete: (signature: Patronize) => Promise<void>;
}
