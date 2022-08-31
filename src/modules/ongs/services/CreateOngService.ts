import AppError from '@shared/errors/AppError';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { IOngsRepository } from '../domain/repositories/IOngsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories';
import { CreateOng } from '../domain/features/CreateOng';
import { Ong } from '../domain/models/Ong';
import { AuthRoles } from '@config/roles';
import { UserProps } from '@modules/users/domain/models';

@injectable()
class CreateOngService implements CreateOng {
  constructor(
    @inject('OngsRepository')
    private ongsRepository: IOngsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    cnpj,
    email,
    password,
    phone,
    address,
  }: CreateOng.Input): Promise<CreateOng.Output> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) throw new AppError('Email address already in use');

    if (!cnpjValidator.isValid(cnpj)) new AppError('The CNPJ is invalid');

    const formatedCNPJ = cnpjValidator.format(cnpj);

    const cnpjExists = await this.ongsRepository.findByCNPJ(formatedCNPJ);

    if (cnpjExists) throw new AppError('CNPJ already in use.');

    const avatar = 'user.jpg';
    const banner = 'banner.jpg';
    const isApproved = false;
    const role = 'Ong' as AuthRoles;
    const hashedPassword = await hash(password, 8);

    const user: UserProps = {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    };

    let ong = new Ong({
      isApproved,
      cnpj: formatedCNPJ,
      avatar,
      banner,
      description: ' ',
      user,
      address,
    });

    ong = await this.ongsRepository.save(ong);

    return ong.toDto();
  }
}
export { CreateOngService };
