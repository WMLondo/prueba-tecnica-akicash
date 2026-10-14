import { akicashApiClient } from "@/lib/akicash-api-client";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { CLIENT_QUERY_KEYS } from "../../constants/client-query-keys.constants";
import type { ClientsResponse } from "../../types/clients-response.type";
import type { GetClientsQuery } from "../../types/get-clients-query.type";

export const useClientsInfiniteQuery = (query: GetClientsQuery) => {
  return useInfiniteQuery({
    queryKey: CLIENT_QUERY_KEYS.list(query),
    queryFn: ({ pageParam }) => {
      return akicashApiClient.get<ClientsResponse>("/client", {
        page: pageParam,
        limit: query.limit,
        search: query.search,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.info.hasNextPage ? lastPage.info.nextPage : undefined,
    placeholderData: keepPreviousData,
  });
};
