import AppError from '@shared/errors/AppError';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { ITutorsRepository } from '../domain/repositories/ITutorsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories';
import { CreateTutor } from '../domain/features/CreateTutor';
import { UserProps } from '@modules/users/domain/models';
import { AuthRoles } from '@config/roles';
import { Tutor } from '../domain/models/Tutor';

@injectable()
class CreateTutorService implements CreateTutor {
  constructor(
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    cpf,
    email,
    password,
    phone,
    address,
  }: CreateTutor.Input): Promise<CreateTutor.Output> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) throw new AppError('Email address already in use');

    if (!cpfValidator.isValid(cpf)) throw new AppError('The cpf is invalid');

    const formatedCpf = cpfValidator.format(cpf);

    const cpfExists = await this.tutorsRepository.findByCPF(formatedCpf);

    if (cpfExists) throw new AppError('CPF already in use.');

    const avatar = 'user.jpg';
    const banner = 'banner.jpg';
    const adoptionRequirements = 0;
    const role = 'Tutor' as AuthRoles;
    const hashedPassword = await hash(password, 8);

    const user: UserProps = {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    };

    let tutor = new Tutor({
      adoptionRequirements,
      cpf: formatedCpf,
      avatar,
      banner,
      description: ' ',
      user,
      address,
    });
    tutor = await this.tutorsRepository.save(tutor);

    return tutor.toPartial();
  }
}

export { CreateTutorService };
