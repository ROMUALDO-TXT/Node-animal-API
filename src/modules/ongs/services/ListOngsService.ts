import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { OngDto } from '../domain/models/Ong';
import { IOngsRepository } from '../domain/repositories/IOngsRepository';

@injectable()
class ListOngService {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
  ) {}

  public async execute(): Promise<PaginatedRepositoryResponse<OngDto>> {
    const ongs = await this.ongsRepository.listOngs();

    return ongs;
  }
}

export { ListOngService };
