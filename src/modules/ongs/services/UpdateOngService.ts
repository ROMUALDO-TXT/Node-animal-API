import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/container/providers/storageProviders/DiskStorageProvider';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import { inject, injectable } from 'tsyringe';
import { IOngsRepository } from '../domain/repositories/IOngsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories';
import { UpdateOng } from '../domain/features/UpdateOng';

@injectable()
class UpdateOngService implements UpdateOng {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    ongId,
    avatar,
    cnpj,
    description,
    name,
    phone,
    email,
    address,
  }: UpdateOng.Input): Promise<UpdateOng.Output> {
    const ong = await this.ongsRepository.findById(ongId);

    if (!ong) throw new AppError('Ong not found.');

    const user = ong.getUser();

    const updateOng = {
      description: description ?? ong.getDescription(),
    };

    const updateUser = {
      name: name ?? user.getName(),
      phone: phone ?? user.getPhone(),
      address: address ?? user.getAddress(),
    };

    if (email) {
      const emailExists = await this.usersRepository.findByEmail(email);

      if (emailExists && emailExists.id !== user.id)
        throw new AppError('Email address already in use');

      Object.assign(updateUser, { email });
    }

    if (cnpj) {
      if (!cnpjValidator.isValid(cnpj))
        throw new AppError('The CNPJ is invalid');

      const formatedCNPJ = cnpjValidator.format(cnpj);

      const cnpjExists = await this.ongsRepository.findByCNPJ(formatedCNPJ);

      if (cnpjExists && cnpjExists.id !== ongId)
        throw new AppError('CNPJ already in use.');

      Object.assign(updateOng, { cnpj: formatedCNPJ });
    }

    if (avatar) {
      const diskProvider = new DiskStorageProvider();
      const currentAvatar = ong.getAvatar();

      if (currentAvatar) {
        await diskProvider.deleteFile(currentAvatar);
      }

      avatar = await diskProvider.saveFile(avatar);
    } else {
      avatar = 'user.jpg';
    }

    Object.assign(updateOng, { avatar });

    ong.update(updateOng, updateUser);

    await this.ongsRepository.save(ong);

    return ong.toDto();
  }
}

export { UpdateOngService };
