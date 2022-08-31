import { Tutor } from '../models/Tutor';

export interface NotifyTutor {
  execute: (data: NotifyTutor.Input) => Promise<void>;
}

export namespace NotifyTutor {
  export type Input = {
    subject: string;
    ongPicture: string;
    tutor: Tutor;
  };
}
