export interface ResetPassword {
  execute: (data: ResetPassword.Input) => Promise<ResetPassword.Output>;
}

export namespace ResetPassword {
  export type Input = {
    token: string;
    password: string;
    password_confirmation: string;
  };

  export type Output = void;
}
