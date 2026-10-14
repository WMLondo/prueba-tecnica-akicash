import { akicashApiClient } from "@/lib/akicash-api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LOAN_APPLICATION_QUERY_KEYS } from "../../constants/loan-application-query-keys.constants";
import type { CreateLoanApplicationResponse } from "../../types/create-loan-application-response.type";
import type { CreateLoanApplication } from "../../types/create-loan-application.type";

export const useCreateLoanApplicationCommand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateLoanApplication) => {
      return akicashApiClient.post<CreateLoanApplicationResponse>(
        "/loan-application",
        body,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LOAN_APPLICATION_QUERY_KEYS.all,
      });
    },
  });
};
