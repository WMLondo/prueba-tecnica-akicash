import type { GetLoanApplicationsQuery } from "../types/get-loan-applications-query.type";

export const LOAN_APPLICATION_QUERY_KEYS = {
  all: ["loan-applications"] as const,
  list: (params: GetLoanApplicationsQuery) =>
    [...LOAN_APPLICATION_QUERY_KEYS.all, "list", params] as const,
};
