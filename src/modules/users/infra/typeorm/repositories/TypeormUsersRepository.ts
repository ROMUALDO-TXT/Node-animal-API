import { AddressProps } from '@modules/users/domain/models/Address';
import { User, UserProps } from '@modules/users/domain/models/User';
import {
  IUsersRepository,
  UsersRepositoryDTO,
} from '@modules/users/domain/repositories/IUsersRepository';
import { PaginatedRepositoryResponse } from '@shared/domain/dtos/Pagination';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User as UserDb } from '../entities/User';
import { MapUser } from '../mappers/MapUser';

@EntityRepository(UserDb)
class UsersRepository implements IUsersRepository {
  private readonly ormRepository: Repository<UserDb>;
  constructor() {
    this.ormRepository = getRepository(UserDb);
  }

  public async findByName(name: string): Promise<User | undefined> {
    const userData = await this.ormRepository.findOne({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          address: 'user.address',
        },
      },
      where: {
        name,
      },
    });

    let user: User | undefined;
    if (userData) {
      user = new User(
        userData as unknown as UserProps,
        userData.address as AddressProps,
      );
    }

    return user;
  }
  public async findById(id: string): Promise<User | undefined> {
    const userData = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    let user: User | undefined;
    if (userData) {
      user = new User(
        userData as unknown as UserProps,
        userData.address as AddressProps,
      );
    }

    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const userData = await this.ormRepository
      .createQueryBuilder('User')
      .where('email = :email', { email })
      .getOne();

    let user: User | undefined;
    if (userData) {
      user = new User(userData as UserProps);
    }

    return user;
  }
  public async listEditors({
    pagination: { skip, take },
  }: UsersRepositoryDTO.List): Promise<PaginatedRepositoryResponse<User>> {
    const [users, count] = await this.ormRepository.findAndCount({
      select: ['id', 'email', 'name', 'phone', 'role'],
      where: {
        role: '1',
      },
      skip,
      take,
    });

    return {
      numberOfItens: count,
      itens: MapUser.mapMany(users),
    };
  }
  public async save(userData: User): Promise<User> {
    const dto = userData.toDto();
    const userDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(userDb);

    return new User(userDb as UserProps, userDb.address as AddressProps);
  }
  public async softDelete(data: User): Promise<void> {
    const dto = data.toDto();

    const userDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(userDb);
  }
}

export { UsersRepository };
