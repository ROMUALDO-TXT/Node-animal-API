import { Pagination } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { ListRequirementTutors } from '../domain/features/ListRequirementsTutors';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';

@injectable()
class ListRequirementTutorsService implements ListRequirementTutors {
  constructor(
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
  ) {}

  public async execute(
    { ongId, animalId }: ListRequirementTutors.Input,
    { skip, take }: Pagination,
  ): Promise<ListRequirementTutors.Output> {
    const tutors = await this.adoptionsRepository.listTutorsByAnimalId(
      ongId,
      animalId,
      {
        skip,
        take,
      },
    );

    return tutors;
  }
}
export { ListRequirementTutorsService };
