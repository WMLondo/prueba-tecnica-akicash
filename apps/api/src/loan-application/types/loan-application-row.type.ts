import { LoanApplicationStatus } from '../../../types/knex.types.js';

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
