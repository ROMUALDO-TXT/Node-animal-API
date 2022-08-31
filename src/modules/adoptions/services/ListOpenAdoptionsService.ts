import { Pagination } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { ListOpenAdoptions } from '../domain/features/ListOpenAdoptions';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';

@injectable()
class ListOpenAdoptionsService implements ListOpenAdoptions {
  constructor(
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
  ) {}

  public async execute(
    { ongId }: ListOpenAdoptions.Input,
    { skip, take }: Pagination,
  ): Promise<ListOpenAdoptions.Output> {
    const adoptions = await this.adoptionsRepository.listOpenAdoptionsByOng(
      ongId,
      {
        skip,
        take,
      },
    );

    return adoptions;
  }
}
export { ListOpenAdoptionsService };
