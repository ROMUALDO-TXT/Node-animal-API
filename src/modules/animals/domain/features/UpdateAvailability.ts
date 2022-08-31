export interface UpdateAvailability {
  execute: (
    data: UpdateAvailability.Input,
  ) => Promise<UpdateAvailability.Output>;
}

export namespace UpdateAvailability {
  export type Input = {
    ongId?: string;
    animalId: string;
    available: boolean;
    adoptionId?: string;
  };

  export type Output = void;
}
