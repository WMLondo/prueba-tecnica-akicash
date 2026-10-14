import { IsOptional, IsString } from '@nestjs/class-validator';
import { GetBaseQueryDto } from '../../common/dtos/get-base-query.dto.js';

export class GetClientQueryDto extends GetBaseQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}
