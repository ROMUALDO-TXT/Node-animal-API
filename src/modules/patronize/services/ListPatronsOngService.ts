import { Pagination } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { ListPatronsOng } from '../domain/features/ListPatronsOng';
import { IPatronizesRepository } from '../domain/repositories/IPatronizesRepository';

@injectable()
class ListPatronsOngService implements ListPatronsOng {
  constructor(
    @inject('PatronizesRepository')
    private patronizesRepository: IPatronizesRepository,
  ) {}

  public async execute(
    { ongId }: ListPatronsOng.Input,
    pagination: Pagination,
  ): Promise<ListPatronsOng.Output> {
    const patronizes =
      await this.patronizesRepository.listActivePatronizesByOng(
        ongId,
        pagination,
      );
    return patronizes;
  }
}

export { ListPatronsOngService };
