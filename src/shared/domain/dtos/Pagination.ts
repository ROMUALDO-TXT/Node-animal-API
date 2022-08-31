export type Pagination = {
  skip: number;
  take: number;
};

export type PaginatedRepositoryResponse<T> = {
  numberOfItens: number;
  itens: T[];
};
