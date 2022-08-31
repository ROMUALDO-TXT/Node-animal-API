import { Ong } from '../models/Ong';

export interface NotifyOng {
  execute: (data: NotifyOng.Input) => Promise<void>;
}

export namespace NotifyOng {
  export type Input = {
    subject: string;
    ong: Ong;
  };
}
