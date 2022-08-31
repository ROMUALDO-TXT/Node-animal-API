import { BankAccountDto, documentType } from '../models/BankAccount';

export interface CreateBankAccount {
  execute: (data: CreateBankAccount.Input) => Promise<CreateBankAccount.Output>;
}

export namespace CreateBankAccount {
  export type Input = {
    name: string;
    documentType: documentType;
    document: string;
    bankNumber: number;
    agencyNumber: number;
    accountNumber: number;
    accountType: string;
    ongId: string;
  };

  export type Output = BankAccountDto;
}
