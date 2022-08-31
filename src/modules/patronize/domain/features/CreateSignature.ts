import { PatronizePartial } from '../models/Patronize';

export interface CreateSignature {
  execute: (data: CreateSignature.Input) => Promise<CreateSignature.Output>;
}

export namespace CreateSignature {
  export type Input = {
    id: string;
    tutorId: string;
    patronizeId: string;
    status: 'ACTIVE' | 'INACTIVE' | 'CONCLUDED' | 'CANCELED' | 'FAILED';
    createdOn: Date;
    startsOn: Date;
    nextBillingDate: Date;
    dueDay: string;
    accessLink: string;
  };

  export type Output = PatronizePartial;
}
