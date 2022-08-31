import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateBankAccountService } from '../../../services/CreateBankAccountService';
import { ListBankAccountsService } from '../../../services/ListBankAccountsService';

export default class OngsBalanceController {
  public async createBankAccount(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      name,
      documentType,
      document,
      bankNumber,
      agencyNumber,
      accountNumber,
      accountType,
    } = request.body;

    const ongId = request.user.child_id;

    const createBankAccountService = container.resolve(
      CreateBankAccountService,
    );

    const account = await createBankAccountService.execute({
      name,
      documentType,
      document,
      bankNumber,
      agencyNumber,
      accountNumber,
      accountType,
      ongId,
    });

    return response.json(account);
  }

  public async listBankAccounts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const ongId = request.user.child_id;

    const listBankAccounts = container.resolve(ListBankAccountsService);

    const accounts = await listBankAccounts.execute(ongId);

    return response.json(accounts);
  }
}
