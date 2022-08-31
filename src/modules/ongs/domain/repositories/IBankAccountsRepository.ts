import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import {
  AccountData,
  BankAccount,
  BankAccountPartial,
} from '../models/BankAccount';

export interface IBankAccountsRepository {
  findById: (id: string) => Promise<BankAccount | undefined>;
  findByAccountData: (
    accountData: AccountData,
  ) => Promise<BankAccount | undefined>;
  listByOngId: (
    ongId: string,
  ) => Promise<PaginatedRepositoryResponse<BankAccountPartial>>;
  save: (accountData: BankAccount) => Promise<BankAccount>;
  softDelete: (accountData: BankAccount) => Promise<void>;
}
