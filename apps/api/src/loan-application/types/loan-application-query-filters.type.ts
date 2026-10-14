import { type LoanApplicationStatus } from '../constants/loan-application.status.constants.js';

export type LoanApplicationQueryFilters = {
  status?: LoanApplicationStatus;
  createFrom?: string;
  createdTo?: string;
};
