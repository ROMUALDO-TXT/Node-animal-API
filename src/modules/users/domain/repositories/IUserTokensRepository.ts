import { UserToken } from '@modules/users/domain/models';

export type GenerateTokenDTO = {
  userId: string;
  token: string;
  expiresIn: Date;
};

export interface IUserTokensRepository {
  generate: (data: GenerateTokenDTO) => Promise<UserToken>;
  findByToken: (token: string) => Promise<UserToken | undefined>;
  expireToken: (token: string) => Promise<void>;
}
