export interface DeleteRequirement {
  execute: (data: DeleteRequirement.Input) => Promise<DeleteRequirement.Output>;
}

export namespace DeleteRequirement {
  export type Input = {
    tutorId: string;
    patronizeId: string;
  };

  export type Output = void;
}
