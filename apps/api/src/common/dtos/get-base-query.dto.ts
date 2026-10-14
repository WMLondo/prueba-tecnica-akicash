import { IsInt, IsOptional, Max, Min } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class GetBaseQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
