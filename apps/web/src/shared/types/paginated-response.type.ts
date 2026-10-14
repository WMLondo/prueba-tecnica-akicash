export type PaginatedResponse<TItems> = {
  items: TItems[];
  total: number;
  page: number;
  limit: number;
};
