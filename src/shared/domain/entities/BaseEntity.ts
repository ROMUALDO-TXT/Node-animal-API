import { randomUUID } from 'crypto';

interface PropsApplyChanges<T> {
  dto: T;
  propertiesToUpdate: string[];
}

export type BaseEntityProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type UpdateEntityProps = Partial<BaseEntityProps>;

export abstract class BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
  protected updatedAt?: Date;
  readonly deletedAt?: Date;

  constructor(props: BaseEntityProps) {
    this.id = props.id ?? randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  protected applyChanges<T>(props: PropsApplyChanges<T>): void {
    const { dto, propertiesToUpdate } = props;
    Object.entries(dto).forEach(([key, value]) => {
      if (propertiesToUpdate.includes(key)) {
        (this as Record<string, unknown>)[key] = value;
      }
    });

    this.updatedAt = new Date();
  }
}
