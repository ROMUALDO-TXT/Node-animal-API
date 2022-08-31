import { AnimalProps } from '@modules/animals/domain/models/Animal';
import { IAnimalsRepository } from '@modules/animals/domain/repositories/IAnimalsRepository';
import AppError from '@shared/errors/AppError';
import { TutorProps } from '@modules/tutors/domain/models/Tutor';
import { ITutorsRepository } from '@modules/tutors/domain/repositories/ITutorsRepository';
import { inject, injectable } from 'tsyringe';
import { CreatePatronize } from '../domain/features/CreatePatronize';
import { Patronize } from '../domain/models/Patronize';
import { IPatronizesRepository } from '../domain/repositories/IPatronizesRepository';

@injectable()
class CreatePatronizeService implements CreatePatronize {
  constructor(
    @inject('PatronizesRepository')
    private patronizesRepository: IPatronizesRepository,
    @inject('AnimalsRepository')
    private animalsRepository: IAnimalsRepository,
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
  ) {}

  public async execute({
    tutorId,
    animalId,
    ...rest
  }: CreatePatronize.Input): Promise<CreatePatronize.Output> {
    const patronizeExists =
      await this.patronizesRepository.findByTutorAndAnimalId(tutorId, animalId);

    if (patronizeExists)
      throw new AppError('This tutor does sponsor this animal already');

    const animal = await this.animalsRepository.findById(animalId);

    if (!animal) throw new AppError('Animal not found.');

    const animalDto = animal.toDto();

    if (animalDto.type !== 'Patronize')
      throw new AppError('The animal choosen is not available for patronizes');

    if (!animalDto.isAvailable)
      throw new AppError('The animal choosen is not available');

    const tutor = await this.tutorsRepository.findById(tutorId);

    if (!tutor) throw new AppError('Tutor not found');

    let patronize = new Patronize({
      animal: animalDto as AnimalProps,
      tutor: tutor.toDto() as TutorProps,
      status: 'REQUESTED',
      ...rest,
    });

    patronize = await this.patronizesRepository.save(patronize);

    return patronize.toPartial();
  }
}

export { CreatePatronizeService };
