import { LoanApplicationStatus } from '../constants/loan-application.status.constants.js';

export type LoanApplicationRow = {
  id: number;
  clientId: number;
  requestedAmount: number;
  termMonths: number;
  status: LoanApplicationStatus;
  createdAt: Date;
  clientFullName: string | null;
  clientDni: string | null;
};
