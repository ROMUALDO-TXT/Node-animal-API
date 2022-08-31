import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { Ong, OngPartial } from '../models/Ong';

export interface IOngsRepository {
  showById: (id: string) => Promise<Ong | undefined>;
  listOngs: () => Promise<PaginatedRepositoryResponse<OngPartial>>;
  findById: (id: string) => Promise<Ong | undefined>;
  findApprovalStatusById: (id: string) => Promise<boolean>;
  findByCNPJ: (cnpj: string) => Promise<Ong | undefined>;
  findByUserId: (id: string) => Promise<Ong | undefined>;
  findByIdRelated: (id: string) => Promise<Ong | undefined>;
  getIdByUserId: (id: string) => Promise<string>;
  save: (ongData: Ong) => Promise<Ong>;
  softDelete: (ongData: Ong) => Promise<void>;
}
