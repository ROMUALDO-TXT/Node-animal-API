import { TutorPartial } from '../models/Tutor';

export interface UpdateTutorBanner {
  execute: (data: UpdateTutorBanner.Input) => Promise<UpdateTutorBanner.Output>;
}

export namespace UpdateTutorBanner {
  export type Input = {
    tutorId: string;
    banner?: string;
  };

  export type Output = TutorPartial;
}
