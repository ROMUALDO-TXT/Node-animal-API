export interface UpdateAdopted {
  execute: (data: UpdateAdopted.Input) => Promise<UpdateAdopted.Output>;
}

export namespace UpdateAdopted {
  export type Input = {
    ongId?: string;
    animalId: string;
    adopted: boolean;
    adoptionId?: string;
  };

  export type Output = void;
}
