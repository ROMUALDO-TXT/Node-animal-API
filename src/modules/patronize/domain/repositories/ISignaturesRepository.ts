import { Signature } from '../models/Signature';

export interface ISignaturesRepository {
  findById: (id: string) => Promise<Signature | undefined>;
  save: (signatureData: Signature) => Promise<Signature>;
  softDelete: (signature: Signature) => Promise<void>;
}
