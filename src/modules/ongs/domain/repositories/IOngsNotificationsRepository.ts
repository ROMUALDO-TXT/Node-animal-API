import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { OngsNotification } from '../models/OngNotification';

export interface IOngsNotificationsRepository {
  findById: (id: string) => Promise<OngsNotification | undefined>;
  listByOngId: (
    ongId: string,
  ) => Promise<PaginatedRepositoryResponse<OngsNotification>>;
  save: (accountData: OngsNotification) => Promise<OngsNotification>;
  softDelete: (accountData: OngsNotification) => Promise<void>;
}
