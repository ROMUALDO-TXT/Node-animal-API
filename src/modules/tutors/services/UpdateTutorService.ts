import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/container/providers/storageProviders/DiskStorageProvider';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { inject, injectable } from 'tsyringe';
import { ITutorsRepository } from '../domain/repositories/ITutorsRepository';
import { UpdateTutor } from '../domain/features/UpdateTutor';
import { IUsersRepository } from '@modules/users/domain/repositories';

@injectable()
class UpdateTutorService implements UpdateTutor {
  constructor(
    @inject('TutorsRepository')
    private tutorsRepository: ITutorsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    tutorId,
    avatar,
    cpf,
    description,
    name,
    phone,
    email,
    address,
  }: UpdateTutor.Input): Promise<UpdateTutor.Output> {
    let tutor = await this.tutorsRepository.findById(tutorId);

    if (!tutor) throw new AppError('Tutor does not exists');

    const user = tutor.getUser();

    const updateTutor = {
      description: description ?? tutor.getDescription(),
    };

    const updateUser = {
      name: name ?? user.getName(),
      phone: phone ?? user.getPhone(),
      address: address ?? user.getAddress(),
    };

    if (email) {
      const emailExists = await this.usersRepository.findByEmail(email);
      if (emailExists && emailExists.id !== user.id) {
        throw new AppError('Email address already in use');
      }
      Object.assign(updateUser, { email });
    }

    if (cpf) {
      if (!cpfValidator.isValid(cpf)) throw new AppError('The cpf is invalid');

      const formatedCpf = cpfValidator.format(cpf);

      const cpfExists = await this.tutorsRepository.findByCPF(formatedCpf);

      if (cpfExists && cpfExists.id !== tutorId)
        throw new AppError('CPF already in use.');

      Object.assign(updateTutor, { cpf: formatedCpf });
    }

    if (avatar) {
      const diskProvider = new DiskStorageProvider();
      const currentAvatar = tutor.getAvatar();
      if (currentAvatar) {
        await diskProvider.deleteFile(currentAvatar);
      }
      avatar = await diskProvider.saveFile(avatar);
    } else {
      avatar = 'user.jpg';
    }

    Object.assign(updateTutor, { avatar });

    tutor.update(updateTutor, updateUser);

    tutor = await this.tutorsRepository.save(tutor);

    return tutor.toPartial();
  }
}

export { UpdateTutorService };
