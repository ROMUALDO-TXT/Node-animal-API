import authConfig from '@config/auth';
import { AuthRoles } from '@config/roles';
import { IOngsRepository } from '@modules/ongs/domain/repositories/IOngsRepository';
import { ITutorsRepository } from '@modules/tutors/domain/repositories/ITutorsRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcrypt';
import { Secret, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { CreateSession } from '../domain/features/CreateSession';
import { IUsersRepository } from '../domain/repositories';

@injectable()
class CreateSessionService implements CreateSession {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
  ) {}

  public async execute({
    email,
    password,
  }: CreateSession.Input): Promise<CreateSession.Output> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect password or email', 401);

    const confirmPassword = await compare(password, user.getPassword());

    if (!confirmPassword)
      throw new AppError('Incorrect password or email', 401);

    let child_id = '';
    switch (user.getRole()) {
      case 'Tutor' as AuthRoles:
        child_id = await this.tutorsRepository.getIdByUserId(user.id);
        break;
      case 'Ong' as AuthRoles:
        child_id = await this.ongsRepository.getIdByUserId(user.id);
        break;
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: JSON.stringify({
        id: user.id,
        name: user.getName(),
        role: user.getRole(),
        child_id,
      }),
      expiresIn: authConfig.jwt.expiresIn,
    });
    return {
      user: {
        email: user.getEmail(),
        phone: user.getPhone(),
        name: user.getName(),
      },
      token,
    };
  }
}

export { CreateSessionService };
