import type { LoanApplicationStatus } from "../constants/loan-status.constants";

export type GetLoanApplicationsQuery = {
  page: number;
  limit: number;
  status?: LoanApplicationStatus;
};
