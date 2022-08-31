export interface ShowTutor {
  execute: (data: ShowTutor.Input) => Promise<ShowTutor.Output>;
}

export namespace ShowTutor {
  export type Input = {
    id: string;
  };

  export type Output = {
    id: string;
    name: string;
    userId: string;
    phone: string;
    email: string;
    avatar?: string;
    banner?: string;
  };
}
