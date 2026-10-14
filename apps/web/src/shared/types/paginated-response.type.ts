import type { PaginationInfo } from "./pagination-info.type";

export type PaginatedResponse<TItems> = {
  items: TItems[];
  info: PaginationInfo;
  totalCount: number;
};
