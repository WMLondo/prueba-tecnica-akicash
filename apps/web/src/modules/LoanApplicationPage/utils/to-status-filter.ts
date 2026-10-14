import {
  LOAN_APPLICATION_STATUS,
  type LoanApplicationStatus,
} from "../constants/loan-status.constants";

export const toStatusFilter = (
  value: string,
): LoanApplicationStatus | undefined => {
  return Object.values(LOAN_APPLICATION_STATUS).find(
    (status) => status === value,
  );
};
