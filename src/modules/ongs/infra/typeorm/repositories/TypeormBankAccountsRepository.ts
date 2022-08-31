import {
  AccountData,
  BankAccount,
  BankAccountPartial,
  BankAccountProps,
} from '@modules/ongs/domain/models/BankAccount';
import { IBankAccountsRepository } from '@modules/ongs/domain/repositories/IBankAccountsRepository';
import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { BankAccount as BankAccountDb } from '../entities/BankAccount';

@EntityRepository(BankAccountDb)
class BankAccountsRepository implements IBankAccountsRepository {
  private readonly ormRepository: Repository<BankAccountDb>;
  constructor() {
    this.ormRepository = getRepository(BankAccountDb);
  }
  public async listByOngId(
    ongId: string,
  ): Promise<PaginatedRepositoryResponse<BankAccountPartial>> {
    const [accountData, count] = (await this.ormRepository.findAndCount({
      where: {
        ong: ongId,
      },
      order: {
        createdAt: 'ASC',
      },
    })) as [unknown, number] as [BankAccount[], number];

    return {
      numberOfItens: count,
      itens: accountData.map(ba => ba.toPartial()),
    };
  }
  public async findById(id: string): Promise<BankAccount | undefined> {
    const accountData = await this.ormRepository.findOne({
      join: {
        alias: 'account',
        leftJoinAndSelect: {
          ong: 'account.ong',
          user: 'ong.user',
        },
      },
      where: {
        id: id,
      },
      order: {
        createdAt: 'ASC',
      },
    });
    let account: BankAccount | undefined;
    if (accountData) {
      account = new BankAccount(accountData as unknown as BankAccountProps);
    }

    return account;
  }
  public async findByAccountData(
    data: AccountData,
  ): Promise<BankAccount | undefined> {
    const accountData = await this.ormRepository.findOne({
      join: {
        alias: 'account',
        leftJoinAndSelect: {
          ong: 'account.ong',
          user: 'ong.user',
        },
      },
      where: {
        bankNumber: data.bankNumber,
        agencyNumber: data.agencyNumber,
        accountNumber: data.accountNumber,
        accountType: data.accountType,
      },
      order: {
        createdAt: 'ASC',
      },
    });
    let account: BankAccount | undefined;
    if (accountData) {
      account = new BankAccount(accountData as unknown as BankAccountProps);
    }

    return account;
  }
  public async save(accountData: BankAccount): Promise<BankAccount> {
    const dto = accountData.toDto();
    const account = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(account);

    return new BankAccount(account as unknown as BankAccountProps);
  }
  public async softDelete(data: BankAccount): Promise<void> {
    const dto = data.toDto();

    const bankAccountDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(bankAccountDb);
  }
}
export { BankAccountsRepository };
