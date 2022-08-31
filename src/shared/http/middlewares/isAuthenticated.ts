import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { AuthRoles } from '@config/roles';
import { Request } from 'express';

type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

export const isAuthenticated =
  (role: AuthRoles | 'All') =>
  (request: Request, _: unknown, next: () => void): void => {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError('JWT is missing');
    const [, token] = authHeader.split(' ');

    try {
      const decodedToken = verify(token, authConfig.jwt.secret);

      const { sub } = decodedToken as TokenPayload;

      const decoded = JSON.parse(sub);

      request.user = decoded;
    } catch {
      throw new AppError('Invalid JWT');
    }
    if (role !== 'All') {
      const userRole = request.user.role as AuthRoles;
      if (userRole !== role) {
        throw new AppError('Insuficient permissions');
      }
    }
    return next();
  };
