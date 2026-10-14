import { ApiClient } from "@/shared/utils/api-client";

export const akicashApiClient = new ApiClient(
  import.meta.env.VITE_API_URL ?? "http://localhost:3000",
);
