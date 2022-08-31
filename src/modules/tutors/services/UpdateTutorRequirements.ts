import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { UpdateTutorRequirements } from '../domain/features/UpdateTutorRequirements';
import { ITutorsRepository } from '../domain/repositories/ITutorsRepository';

@injectable()
class UpdateTutorRequirementsService implements UpdateTutorRequirements {
  constructor(
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
  ) {}

  public async execute({
    operation,
    tutorId,
  }: UpdateTutorRequirements.Input): Promise<void> {
    let tutor = await this.tutorsRepository.findById(tutorId);

    if (!tutor) throw new AppError('Tutor not found.');

    let requirements = tutor.getRequirements();

    if (operation === 'Plus') {
      tutor.setRequirement(requirements++);
    } else {
      tutor.setRequirement(requirements--);
    }
    tutor = await this.tutorsRepository.save(tutor);
  }
}

export { UpdateTutorRequirementsService };
