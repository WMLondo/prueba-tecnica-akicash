import type { PaginatedResponse } from "../../../shared/types/paginated-response.type";
import type { LoanApplication } from "./loan-application.type";

export type LoanApplicationsResponse = PaginatedResponse<LoanApplication>;
