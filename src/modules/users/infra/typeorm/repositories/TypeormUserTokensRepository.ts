import {
  GenerateTokenDTO,
  IUserTokensRepository,
} from '@modules/users/domain/repositories';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { UserToken } from '@modules/users/domain/models';
import { UserToken as TokenDb } from '../entities/UserToken';

@EntityRepository(UserToken)
class UserTokensRepository implements IUserTokensRepository {
  private readonly ormRepository: Repository<TokenDb>;

  constructor() {
    this.ormRepository = getRepository(TokenDb);
  }

  public async generate({
    token,
    userId,
    expiresIn,
  }: GenerateTokenDTO): Promise<UserToken> {
    let userToken = this.ormRepository.create({ userId, token, expiresIn });

    userToken = await this.ormRepository.save(userToken);

    return new UserToken(userToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });

    return userToken ? new UserToken(userToken) : undefined;
  }

  public async expireToken(token: string): Promise<void> {
    const tokenDb = await this.ormRepository.findOne({ token });

    if (!tokenDb) return;

    tokenDb.expiresIn = new Date();

    await this.ormRepository.save(tokenDb);
  }
}

export { UserTokensRepository };
