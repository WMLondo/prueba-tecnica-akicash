import { useEffect, useState } from "react";
import { DataTable } from "../../shared/components/data-table";
import { Pagination } from "../../shared/components/pagination";
import { useDebounce } from "../../shared/hooks/use-debounce";
import { useLoanApplicationsQuery } from "./api/queries/use-loan-applications-query";
import { columns } from "./components/columns";
import { LoanApplicationHeader } from "./components/loan-application-header";
import { LoanApplicationToolbar } from "./components/loan-application-toolbar";
import { toStatusFilter } from "./utils/to-status-filter";

export const LoanApplicationPage = () => {
  const [page, setPage] = useState(1);
  const [statusInput, setStatusInput] = useState("");
  const debouncedStatusInput = useDebounce(statusInput, 400);

  const status = toStatusFilter(debouncedStatusInput);

  const { data, isLoading, error } = useLoanApplicationsQuery({
    page,
    limit: 20,
    status,
  });

  useEffect(() => {
    setPage(1);
  }, [status]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
      <LoanApplicationHeader />
      <LoanApplicationToolbar
        status={statusInput}
        onStatusChange={setStatusInput}
      />
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        error={error}
        emptyMessage="No hay solicitudes de crédito."
      />
      {data ? (
        <Pagination
          page={data.info.page}
          pageSize={data.info.pageSize}
          totalCount={data.totalCount}
          hasPrevPage={data.info.hasPrevPage}
          hasNextPage={data.info.hasNextPage}
          onPageChange={setPage}
        />
      ) : null}
    </div>
  );
};
