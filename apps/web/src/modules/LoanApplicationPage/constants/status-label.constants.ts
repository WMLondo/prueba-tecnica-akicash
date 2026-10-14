import { LOAN_APPLICATION_STATUS } from "./loan-status.constants";

export const STATUS_LABEL = {
  [LOAN_APPLICATION_STATUS.PENDING]: "Pendiente",
  [LOAN_APPLICATION_STATUS.APPROVED]: "Aprobado",
  [LOAN_APPLICATION_STATUS.REJECTED]: "Rechazado",
} as const;
