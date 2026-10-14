import { LoanApplicationStatus } from '../constants/loan-application.status.constants.js';

export type CreateLoanApplicationData = {
  client_id: number;
  requested_amount: number;
  term_months: number;
  status: LoanApplicationStatus;
};
