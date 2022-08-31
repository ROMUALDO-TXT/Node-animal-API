import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/container/providers/storageProviders/DiskStorageProvider';
import { inject, injectable } from 'tsyringe';
import { ITutorsRepository } from '../domain/repositories/ITutorsRepository';
import { UpdateTutorBanner } from '../domain/features/UpdateTutorBanner';

@injectable()
class UpdateTutorBannerService implements UpdateTutorBanner {
  constructor(
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
  ) {}

  public async execute({
    tutorId,
    banner,
  }: UpdateTutorBanner.Input): Promise<UpdateTutorBanner.Output> {
    let tutor = await this.tutorsRepository.findById(tutorId);

    if (!tutor) throw new AppError('Tutor not found.');

    if (banner) {
      const diskProvider = new DiskStorageProvider();
      const currentAvatar = tutor.getAvatar();
      if (currentAvatar) {
        await diskProvider.deleteFile(currentAvatar);
      }
      banner = await diskProvider.saveFile(banner);
    } else {
      banner = 'user.jpg';
    }

    tutor.update({
      banner,
      bannerUrl: tutor.generateBannerUrl(banner),
    });

    tutor = await this.tutorsRepository.save(tutor);

    return tutor.toPartial();
  }
}

export { UpdateTutorBannerService };
