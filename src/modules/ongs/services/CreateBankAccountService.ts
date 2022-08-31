import AppError from '@shared/errors/AppError';
import { cnpj as cnpjValidator, cpf as cpfValidator } from 'cpf-cnpj-validator';
import { inject, injectable } from 'tsyringe';
import { CreateBankAccount } from '../domain/features/CreateBankAccount';
import { AccountData, BankAccount } from '../domain/models/BankAccount';
import { OngProps } from '../domain/models/Ong';
import { IBankAccountsRepository } from '../domain/repositories/IBankAccountsRepository';
import { IOngsRepository } from '../domain/repositories/IOngsRepository';

@injectable()
class CreateBankAccountService implements CreateBankAccount {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  public async execute({
    name,
    documentType,
    document,
    bankNumber,
    agencyNumber,
    accountNumber,
    accountType,
    ongId,
  }: CreateBankAccount.Input): Promise<CreateBankAccount.Output> {
    const ong = await this.ongsRepository.findById(ongId);

    if (!ong) throw new AppError('Ong not found.');

    const accountExists = await this.bankAccountsRepository.findByAccountData({
      bankNumber,
      agencyNumber,
      accountNumber,
      accountType,
    } as AccountData);

    if (accountExists) {
      throw new AppError('Account already exists');
    }

    if (documentType === 'CNPJ') {
      if (!document) throw new AppError('CNPJ is missing.');

      if (!cnpjValidator.isValid(document))
        throw new AppError('The CNPJ is invalid');

      document = cnpjValidator.format(document);
    }
    if (documentType === 'CPF') {
      if (!document) throw new AppError('CNPJ is missing.');

      if (!cpfValidator.isValid(document))
        throw new AppError('The CNPJ is invalid');

      document = cpfValidator.format(document);
    }

    let account = new BankAccount({
      name,
      documentType,
      document,
      bankNumber,
      agencyNumber,
      accountNumber,
      accountType,
      ong: ong.toDto() as OngProps,
    });

    account = await this.bankAccountsRepository.save(account);

    return account.toDto();
  }
}

export { CreateBankAccountService };
