import {
  Signature,
  SignatureProps,
} from '@modules/patronize/domain/models/Signature';
import { ISignaturesRepository } from '@modules/patronize/domain/repositories/ISignaturesRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Signature as SignatureDb } from '../entities/Signature';

@EntityRepository(SignatureDb)
class SignaturesRepository implements ISignaturesRepository {
  private readonly ormRepository: Repository<SignatureDb>;

  constructor() {
    this.ormRepository = getRepository(SignatureDb);
  }

  public async findById(id: string): Promise<Signature | undefined> {
    const signatureData = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    let signature: Signature | undefined;
    if (signatureData) {
      signature = new Signature(signatureData as unknown as SignatureProps);
    }
    return signature;
  }

  public async save(signatureData: Signature): Promise<Signature> {
    const dto = signatureData.toDto();
    const signatureDb = this.ormRepository.create({
      ...dto,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(signatureDb);

    return new Signature(signatureDb as unknown as SignatureProps);
  }

  public async softDelete(data: Signature): Promise<void> {
    const dto = data.toDto();

    const signatureDb = this.ormRepository.create({
      ...dto,
      deletedAt: new Date(),
    });

    await this.ormRepository.save(signatureDb);
  }
}

export { SignaturesRepository };
