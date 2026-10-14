export type PaginationInfo = {
  page: number;
  pageSize: number;
  prevPage?: number;
  nextPage?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
};
