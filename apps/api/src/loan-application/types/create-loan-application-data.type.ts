import { LoanApplicationStatus } from '../../../types/knex.types.js';

export type CreateLoanApplicationData = {
  client_id: number;
  requested_amount: number;
  term_months: number;
  status: LoanApplicationStatus;
};
