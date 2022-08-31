export interface CreateSession {
  execute: (data: CreateSession.Input) => Promise<CreateSession.Output>;
}

export namespace CreateSession {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = {
    user: {
      email: string;
      phone: string;
      name: string;
    };
    token: string;
  };
}
