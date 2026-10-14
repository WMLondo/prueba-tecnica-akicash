import { GetBaseInfoDto } from './get-base-info.dto.js';

export class GetBaseResponseDto<TItem> {
  items: TItem[];

  info: GetBaseInfoDto;

  totalCount: number;
}
