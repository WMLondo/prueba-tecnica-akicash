import { LOAN_APPLICATION_STATUS } from "./loan-status.constants";
import { STATUS_LABEL } from "./status-label.constants";

export const LOAN_STATUS_OPTIONS = [
  {
    value: LOAN_APPLICATION_STATUS.PENDING,
    label: STATUS_LABEL[LOAN_APPLICATION_STATUS.PENDING],
  },
  {
    value: LOAN_APPLICATION_STATUS.APPROVED,
    label: STATUS_LABEL[LOAN_APPLICATION_STATUS.APPROVED],
  },
  {
    value: LOAN_APPLICATION_STATUS.REJECTED,
    label: STATUS_LABEL[LOAN_APPLICATION_STATUS.REJECTED],
  },
] as const;
