import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { GetBaseQueryDto } from '../../common/dtos/get-base-query.dto.js';
import {
  LOAN_APPLICATION_STATUS,
  type LoanApplicationStatus,
} from '../constants/loan-application.status.constants.js';

export class GetLoanApplicationQueryDto extends GetBaseQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(Object.values(LOAN_APPLICATION_STATUS))
  status?: LoanApplicationStatus;

  @IsOptional()
  @IsDateString()
  createdFrom?: string;

  @IsOptional()
  @IsDateString()
  createdTo?: string;
}
