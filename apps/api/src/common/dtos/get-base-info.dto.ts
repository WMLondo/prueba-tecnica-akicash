export class GetBaseInfoDto {
  page: number;

  pageSize: number;

  prevPage?: number;

  nextPage?: number;

  hasPrevPage?: boolean;

  hasNextPage?: boolean;
}
