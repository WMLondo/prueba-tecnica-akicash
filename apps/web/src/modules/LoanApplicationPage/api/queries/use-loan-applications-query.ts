import { akicashApiClient } from "@/lib/akicash-api-client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { LOAN_APPLICATION_QUERY_KEYS } from "../../constants/loan-application-query-keys.constants";
import type { GetLoanApplicationsQuery } from "../../types/get-loan-applications-query.type";
import type { LoanApplicationsResponse } from "../../types/loan-application-response.type";

export const useLoanApplicationsQuery = (query: GetLoanApplicationsQuery) => {
  return useQuery({
    queryKey: LOAN_APPLICATION_QUERY_KEYS.list(query),
    queryFn: () => {
      return akicashApiClient.get<LoanApplicationsResponse>(
        "/loan-application",
        {
          page: query.page,
          limit: query.limit,
          status: query.status,
        },
      );
    },
    placeholderData: keepPreviousData,
  });
};
