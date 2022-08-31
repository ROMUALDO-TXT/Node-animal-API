import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { inject, injectable } from 'tsyringe';
import { BankAccountDto } from '../domain/models/BankAccount';
import { IBankAccountsRepository } from '../domain/repositories/IBankAccountsRepository';

@injectable()
class ListBankAccountsService {
  constructor(
    @inject('BankAccountRepository')
    private accountsRepository: IBankAccountsRepository,
  ) {}

  public async execute(
    ongId: string,
  ): Promise<PaginatedRepositoryResponse<BankAccountDto>> {
    const accounts = await this.accountsRepository.listByOngId(ongId);

    return accounts;
  }
}

export { ListBankAccountsService };
