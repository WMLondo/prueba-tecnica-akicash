import { Knex } from 'knex';

export type LoanApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface Client {
  id: number;
  full_name: string;
  dni: string;
  monthly_income: number;
  created_at: Date;
}

export interface LoanApplication {
  id: number;
  client_id: number;
  requested_amount: number;
  term_months: number;
  status: LoanApplicationStatus;
  created_at: Date;
}

export interface Installment {
  id: number;
  loan_application_id: number;
  due_date: Date;
  amount: number;
  paid: boolean;
}

declare module 'knex/types/tables.js' {
  interface Tables {
    client: Knex.CompositeTableType<
      Client,
      Omit<Client, 'id' | 'created_at'> & Partial<Pick<Client, 'created_at'>>,
      Partial<Omit<Client, 'id'>>
    >;
    loan_application: Knex.CompositeTableType<
      LoanApplication,
      Omit<LoanApplication, 'id' | 'created_at' | 'status'> &
        Partial<Pick<LoanApplication, 'created_at' | 'status'>>,
      Partial<Omit<LoanApplication, 'id'>>
    >;
    installment: Knex.CompositeTableType<
      Installment,
      Omit<Installment, 'id' | 'paid'> & Partial<Pick<Installment, 'paid'>>,
      Partial<Omit<Installment, 'id'>>
    >;
  }
}
