import AppError from '@shared/errors/AppError';
import { AnimalProps } from '@modules/animals/domain/models/Animal';
import { IAnimalsRepository } from '@modules/animals/domain/repositories/IAnimalsRepository';
import { TutorProps } from '@modules/tutors/domain/models/Tutor';
import { ITutorsRepository } from '@modules/tutors/domain/repositories/ITutorsRepository';
import { inject, injectable } from 'tsyringe';
import { CreateAdoption } from '../domain/features/CreateAdoption';
import { Adoption } from '../domain/models/Adoption';
import { IAdoptionsRepository } from '../domain/repositories/IAdoptionsRepository';

@injectable()
class CreateAdoptionService implements CreateAdoption {
  constructor(
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
    @inject('AdoptionsRepository')
    private adoptionsRepository: IAdoptionsRepository,
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
  ) {}

  public async execute({
    tutorId,
    animalId,
  }: CreateAdoption.Input): Promise<CreateAdoption.Output> {
    const adoptionExists =
      await this.adoptionsRepository.findByTutorAndAnimalId(tutorId, animalId);

    if (adoptionExists) {
      throw new AppError(
        'This tutor already have a adoption requirement for this animal',
      );
    }

    const animal = await this.animalsRepository.findById(animalId);

    if (!animal) throw new AppError('Animal not found.');

    if (animal.getType() !== 'Adoption')
      throw new AppError('The animal choosen is not available for adoptions');

    if (!animal.getAvailable())
      throw new AppError('The animal choosen is not available');

    const tutor = await this.tutorsRepository.findById(tutorId);

    if (!tutor) throw new AppError('Tutor not found');

    if (tutor.getRequirements() >= 5) {
      throw new AppError(
        'This tutor has reached the adoption requirements limit.',
      );
    }
    const status = 'Solicitado';
    let adoption = new Adoption({
      requestDate: new Date(),
      status,
      tutor: tutor as unknown as TutorProps,
      animal: animal as unknown as AnimalProps,
    });

    adoption = await this.adoptionsRepository.save(adoption);

    // const tutorNotification: TutorsNotificationDTO = {
    //   subject: `Seu pedido de adoção para a ong ${animal.ong.user.name} foi criado`,
    //   ongPicture: animal.ong.avatar as string,
    //   tutor,
    // };
    // const ongNotification: OngsNotificationDTO = {
    //   subject: `${tutor.user.name} solicitou adoção de ${animal.name}`,
    //   ong: animal.ong,
    // };

    return adoption.toPartial();
  }
}

export { CreateAdoptionService };
