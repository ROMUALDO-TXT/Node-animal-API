import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { CreateSignature } from '../domain/features/CreateSignature';
import { IPatronizesRepository } from '../domain/repositories/IPatronizesRepository';
import { ISignaturesRepository } from '../domain/repositories/ISignaturesRepository';

@injectable()
class CreateSignatureService implements CreateSignature {
  constructor(
    @inject('PatronizesRepository')
    private patronizesRepository: IPatronizesRepository,
    @inject('SignaturesRepository')
    private signaturesRepository: ISignaturesRepository,
  ) {}

  public async execute({
    tutorId,
    patronizeId,
    ...signatureData
  }: CreateSignature.Input): Promise<CreateSignature.Output> {
    const signatureExists = await this.signaturesRepository.findById(
      signatureData.id,
    );

    if (signatureExists) throw new AppError('Signature already exists');

    let patronize = await this.patronizesRepository.findById(patronizeId);

    if (!patronize) throw new AppError('Patronizing requirement not found');

    const patronizeDto = patronize.toDto();

    if (tutorId !== patronizeDto.tutor.id) {
      throw new AppError(
        'This patronizing requirement does not belong to this tutor',
      );
    }

    patronize.setSignature(signatureData);
    patronize.setStatus('ACTIVE');

    patronize = await this.patronizesRepository.save(patronize);

    // const tutorNotification: TutorsNotificationDTO = {
    //   subject: `Você começou a apadrinhar ${patronize.animal.ong.user.name} da ong ${patronize.animal.ong.user.name}`,
    //   ongPicture: patronize.animal.ong.avatar as string,
    //   tutor: patronize.tutor,
    // };
    // const ongNotification: OngsNotificationDTO = {
    //   subject: `${patronize.tutor.user.name} começou a apadrinhar ${patronize.animal.name}`,
    //   ong: patronize.animal.ong,
    // };

    return patronize.toPartial();
  }
}

export { CreateSignatureService };
