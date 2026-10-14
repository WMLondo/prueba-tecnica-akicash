import type { LoanApplicationStatus } from "../constants/loan-status.constants";
import type { LoanApplicationClient } from "./loan-application-client.type";

export type LoanApplication = {
  id: number;
  clientId: number;
  requestedAmount: number;
  termMonths: number;
  status: LoanApplicationStatus;
  createdAt: string;
  client?: LoanApplicationClient;
};
