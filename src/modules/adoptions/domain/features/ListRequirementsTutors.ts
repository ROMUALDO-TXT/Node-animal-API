import { TutorPartial } from '@modules/tutors/domain/models/Tutor';
import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';

export interface ListRequirementTutors {
  execute: (
    data: ListRequirementTutors.Input,
    pagination: Pagination,
  ) => Promise<ListRequirementTutors.Output>;
}

export namespace ListRequirementTutors {
  export type Input = {
    ongId: string;
    animalId: string;
  };

  export type Output = PaginatedRepositoryResponse<TutorPartial>;
}
