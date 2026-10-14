export type CreateInstallmentData = {
  loan_application_id: number;
  due_date: Date;
  amount: number;
  paid: boolean;
};
