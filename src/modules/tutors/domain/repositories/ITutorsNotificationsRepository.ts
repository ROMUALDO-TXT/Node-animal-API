import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { TutorsNotification } from '../models/TutorNotification';

export interface ITutorsNotificationsRepository {
  findById: (id: string) => Promise<TutorsNotification | undefined>;
  listByTutorId: (
    Id: string,
  ) => Promise<PaginatedRepositoryResponse<TutorsNotification>>;
  save: (accountData: TutorsNotification) => Promise<TutorsNotification>;
  softDelete: (accountData: TutorsNotification) => Promise<void>;
}
