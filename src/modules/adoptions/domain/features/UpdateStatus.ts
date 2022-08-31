import { AdoptionPartial } from '../models/Adoption';

export interface UpdateStatus {
  execute: (data: UpdateStatus.Input) => Promise<UpdateStatus.Output>;
}

export namespace UpdateStatus {
  export type Input = {
    ongId: string;
    status: 'Aprovado' | 'Negado' | 'Em analise';
    motif?: string;
    adoptionId: string;
  };

  export type Output = AdoptionPartial;
}
