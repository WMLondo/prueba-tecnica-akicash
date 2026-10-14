import type { LoanApplicationStatus } from "../constants/loan-status.constants";

export type LoanApplication = {
  id: string;
  clientName: string;
  requestedAmount: number;
  termMonths: number;
  status: LoanApplicationStatus;
  createdAt: string;
};
