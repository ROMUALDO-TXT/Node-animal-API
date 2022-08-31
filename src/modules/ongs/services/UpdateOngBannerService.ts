import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/container/providers/storageProviders/DiskStorageProvider';
import { inject, injectable } from 'tsyringe';
import { IOngsRepository } from '../domain/repositories/IOngsRepository';
import { UpdateOngBanner } from '../domain/features/UpdateOngBanner';

@injectable()
class UpdateOngBannerService implements UpdateOngBanner {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
  ) {}

  public async execute({
    ongId,
    banner,
  }: UpdateOngBanner.Input): Promise<UpdateOngBanner.Output> {
    let ong = await this.ongsRepository.findById(ongId);

    if (!ong) throw new AppError('Ong not found.');

    if (banner) {
      const diskProvider = new DiskStorageProvider();
      const currentAvatar = ong.getAvatar();

      if (currentAvatar) {
        await diskProvider.deleteFile(currentAvatar);
      }

      banner = await diskProvider.saveFile(banner);
    } else {
      banner = 'user.jpg';
    }

    ong.update({
      banner,
      bannerUrl: ong.generateBannerUrl(banner),
    });

    ong = await this.ongsRepository.save(ong);

    return ong.toDto();
  }
}

export { UpdateOngBannerService };
