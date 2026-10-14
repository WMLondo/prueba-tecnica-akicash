export const LOAN_APPLICATION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type LoanApplicationStatus =
  (typeof LOAN_APPLICATION_STATUS)[keyof typeof LOAN_APPLICATION_STATUS];
