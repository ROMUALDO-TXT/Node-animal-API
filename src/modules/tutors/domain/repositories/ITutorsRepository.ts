import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { Tutor, TutorPartial } from '../models/Tutor';

export interface ITutorsRepository {
  showById: (id: string) => Promise<Tutor | undefined>;
  listTutors: ({
    skip,
    take,
  }: Pagination) => Promise<PaginatedRepositoryResponse<TutorPartial>>;
  findById: (id: string) => Promise<Tutor | undefined>;
  findByCPF: (cnpj: string) => Promise<Tutor | undefined>;
  getIdByUserId: (id: string) => Promise<string>;
  save: (ongData: Tutor) => Promise<Tutor>;
  softDelete: (ongData: Tutor) => Promise<void>;
}
