import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { UpdateStatus } from '../domain/features/UpdateStatus';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';

@injectable()
class UpdateStatusService implements UpdateStatus {
  constructor(
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
  ) {}

  public async execute({
    ongId,
    status,
    motif,
    adoptionId,
  }: UpdateStatus.Input): Promise<UpdateStatus.Output> {
    const adoption = await this.adoptionsRepository.findById(adoptionId);

    if (!adoption) throw new AppError('Adoption not found.');

    if (adoption.getAnimal().getOng().getId() !== ongId) {
      throw new AppError('This adoption does not belong to this ong');
    }

    const updateAdoption = {
      status: status ?? adoption.getStatus(),
    };

    if (status !== 'Em analise')
      Object.assign(updateAdoption, { conclusionDate: new Date() });

    if (motif) Object.assign(updateAdoption, { description: motif });

    adoption.update(updateAdoption);

    const updatedAdoption = await this.adoptionsRepository.save(adoption);

    // const tutorNotification: TutorsNotificationDTO = {
    //   subject: `Seu pedido de adoção para a ong ${adoption.animal.ong.user.name} está ${status}`,
    //   ongPicture: adoption.animal.ong.avatar as string,
    //   tutor: adoption.tutor,
    // };

    return updatedAdoption.toPartial();
  }
}

export { UpdateStatusService };
