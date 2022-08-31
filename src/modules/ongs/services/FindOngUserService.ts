import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { OngDto } from '../domain/models/Ong';
import { IOngsRepository } from '../domain/repositories/IOngsRepository';

@injectable()
class FindOngUserService {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
  ) {}
  public async execute(userId: string): Promise<OngDto> {
    const ong = await this.ongsRepository.findByUserId(userId);

    if (!ong) throw new AppError('Ong not found.');

    return ong.toDto();
  }
}

export { FindOngUserService };
