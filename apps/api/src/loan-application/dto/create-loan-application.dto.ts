import {
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  Max,
  Min,
} from '@nestjs/class-validator';
import {
  LOAN_APPLICATION_STATUS,
  type LoanApplicationStatus,
} from '../constants/loan-application.status.constants.js';

export class CreateLoanApplicationDto {
  @IsInt()
  @IsPositive()
  clientId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  requestedAmount: number;

  @IsInt()
  @Min(1)
  @Max(360)
  termMonths: number;

  @IsEnum(LOAN_APPLICATION_STATUS)
  status: LoanApplicationStatus;
}
