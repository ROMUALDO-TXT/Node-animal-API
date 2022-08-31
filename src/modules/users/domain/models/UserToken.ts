import { randomUUID } from 'crypto';

export type CreateUserTokenDTO = {
  id?: string;
  token: string;
  userId: string;
  expiresIn: Date;
  createdAt?: Date;
};

export class UserToken {
  private readonly id: string;
  private readonly token: string;
  private readonly userId: string;
  private readonly expiresIn: Date;
  private readonly createdAt: Date;

  constructor(props: CreateUserTokenDTO) {
    this.id = props.id ?? randomUUID();
    this.token = props.token;
    this.userId = props.userId;
    this.expiresIn = props.expiresIn;
    this.createdAt = props.createdAt ?? new Date();
  }

  getToken(): string {
    return this.token;
  }

  getExpiration(): Date {
    return this.expiresIn;
  }

  getUserId(): string {
    return this.userId;
  }
}
