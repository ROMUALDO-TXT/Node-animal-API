import { AddressProps } from '@modules/users/domain/models';
import { User } from '@modules/users/domain/models/User';
import { User as UserDb } from '../entities/User';

export class MapUser {
  static mapOne(userDb: UserDb): User {
    return new User(
      {
        id: userDb.id,
        name: userDb.name,
        email: userDb.email,
        phone: userDb.phone,
        password: userDb.password,
        role: userDb.role,
        createdAt: userDb.createdAt,
        updatedAt: userDb.updatedAt,
        deletedAt: userDb.deletedAt,
      },
      userDb.address as AddressProps,
    );
  }

  static mapMany(usersDb: UserDb[]): User[] {
    return usersDb.map(this.mapOne);
  }
}
