import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Ong } from '../domain/models/Ong';
import { IOngsRepository } from '../domain/repositories/IOngsRepository';

@injectable()
class ApproveOngService {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
  ) {}

  public async execute(id: string): Promise<Ong> {
    let ong = await this.ongsRepository.findById(id);
    if (!ong) {
      throw new AppError('Ong not found.');
    }
    if (ong.getApproved()) {
      throw new AppError('This ong is already approved');
    }
    ong.setApproved(true);

    ong = await this.ongsRepository.save(ong);

    return ong;
  }
}

export { ApproveOngService };
