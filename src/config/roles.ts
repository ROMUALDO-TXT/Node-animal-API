export type AuthRoles = 'Admin' | 'Editor' | 'Tutor' | 'Ong';

export type TroleOptions = {
  [key: string]: () => void;
};
