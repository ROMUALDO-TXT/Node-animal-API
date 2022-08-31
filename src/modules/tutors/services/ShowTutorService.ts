import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ShowTutor } from '../domain/features/ShowTutor';
import { ITutorsRepository } from '../domain/repositories/ITutorsRepository';

@injectable()
class ShowTutorService implements ShowTutor {
  constructor(
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
  ) {}

  public async execute({ id }: ShowTutor.Input): Promise<ShowTutor.Output> {
    const tutor = await this.tutorsRepository.findById(id);

    if (!tutor) {
      throw new AppError('Tutor not found.');
    }

    const tutorDto = tutor.toDto();

    return {
      id: tutorDto.id,
      name: tutorDto.user.name,
      userId: tutorDto.user.id,
      phone: tutorDto.user.phone,
      email: tutorDto.user.email,
      avatar: tutorDto.avatar,
      banner: tutorDto.banner,
    };
  }
}

export { ShowTutorService };
