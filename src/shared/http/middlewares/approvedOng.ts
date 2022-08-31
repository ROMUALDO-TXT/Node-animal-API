import { OngsRepository } from '@modules/ongs/infra/typeorm/repositories/TypeormOngsRepository';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request } from 'express';
import { getCustomRepository } from 'typeorm';

export default async function approvedOng(
  request: Request,
  _: unknown,
  next: NextFunction,
): Promise<void> {
  const ongsRepository = getCustomRepository(OngsRepository);
  const status = await ongsRepository.findApprovalStatusById(
    request.user.child_id,
  );
  if (status) {
    next();
  } else {
    throw new AppError('Ong not approved');
  }
}
