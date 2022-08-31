import { TutorPartial } from '../models/Tutor';

export interface UpdateTutorPassword {
  execute: (
    data: UpdateTutorPassword.Input,
  ) => Promise<UpdateTutorPassword.Output>;
}

export namespace UpdateTutorPassword {
  export type Input = {
    id: string;
    oldPassword: string;
    password: string;
  };

  export type Output = TutorPartial;
}
