import type { GetClientsQuery } from "../types/get-clients-query.type";

export const CLIENT_QUERY_KEYS = {
  all: ["clients"] as const,
  list: (params: GetClientsQuery) =>
    [...CLIENT_QUERY_KEYS.all, "list", params] as const,
};
