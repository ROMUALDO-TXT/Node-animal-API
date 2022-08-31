export interface UpdateTutorRequirements {
  execute: (data: UpdateTutorRequirements.Input) => Promise<void>;
}

export namespace UpdateTutorRequirements {
  export type Input = {
    tutorId: string;
    operation: 'Plus' | 'Minus';
  };
}
