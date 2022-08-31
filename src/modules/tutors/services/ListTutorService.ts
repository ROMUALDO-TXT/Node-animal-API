import {
  PaginatedRepositoryResponse,
  Pagination,
} from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { TutorPartial } from '../domain/models/Tutor';
import { ITutorsRepository } from '../domain/repositories/ITutorsRepository';

@injectable()
class ListTutorService {
  constructor(
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
  ) {}

  public async execute({
    skip,
    take,
  }: Pagination): Promise<PaginatedRepositoryResponse<TutorPartial>> {
    const tutors = await this.tutorsRepository.listTutors({ skip, take });

    return tutors;
  }
}

export { ListTutorService };
