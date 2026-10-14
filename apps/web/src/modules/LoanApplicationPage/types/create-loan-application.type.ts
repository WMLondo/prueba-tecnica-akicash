import type { LoanApplicationStatus } from "../constants/loan-status.constants";

export type CreateLoanApplication = {
  clientId: number;
  requestedAmount: number;
  termMonths: number;
  status: LoanApplicationStatus;
};
