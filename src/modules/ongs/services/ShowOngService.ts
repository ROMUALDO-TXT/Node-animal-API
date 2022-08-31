import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ShowOng } from '../domain/features/ShowOng';
import { IOngsRepository } from '../domain/repositories/IOngsRepository';

@injectable()
class ShowOngService implements ShowOng {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
  ) {}

  public async execute({ id }: ShowOng.Input): Promise<ShowOng.Output> {
    const ong = await this.ongsRepository.showById(id);

    if (!ong) {
      throw new AppError('Ong not found.');
    }
    const ongDto = ong.toDto();

    return {
      id: ongDto.id,
      userId: ongDto.user.id,
      name: ongDto.user.name,
      email: ongDto.user.email,
      phone: ongDto.user.phone,
      description: ongDto.description,
      avatar: ongDto.avatar,
      banner: ongDto.banner,
      address: ongDto.user.address,
      isApproved: ongDto.isApproved,
    };
  }
}

export { ShowOngService };
