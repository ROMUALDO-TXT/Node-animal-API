export interface AdminContact {
  execute: (data: AdminContact.Input) => Promise<void>;
}

export namespace AdminContact {
  export type Input = {
    email: string;
    name: string;
    phone: string;
    description: string;
  };
}
