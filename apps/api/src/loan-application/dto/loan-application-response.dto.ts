import { LoanApplicationStatus } from '../constants/loan-application.status.constants.js';

export class LoanApplicationResponseDto {
  id: number;
  clientId: number;
  requestedAmount: number;
  termMonths: number;
  status: LoanApplicationStatus;
  createdAt: Date;
  client?: {
    id: number;
    fullName: string;
    dni: string;
  };
}
