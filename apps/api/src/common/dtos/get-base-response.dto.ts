import { GetBaseInfoDto } from './get-base-info.dto.js';

export class GetBaseResponseDto<T> {
  items: T[];

  info: GetBaseInfoDto;

  totalCount: number;
}
