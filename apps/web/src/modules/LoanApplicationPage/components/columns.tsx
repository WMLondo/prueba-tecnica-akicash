import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "../../../shared/components/data-table/data-table-features";
import { Badge } from "../../../shared/components/ui/badge";
import { STATUS_VARIANT } from "../constants/status-variant.constants";
import type { LoanApplication } from "../types/loan-application.type";

const columnHelper = createColumnHelper<DataTableFeatures, LoanApplication>();

export const columns = columnHelper.columns([
  columnHelper.accessor("clientName", { header: "Cliente" }),
  columnHelper.accessor("requestedAmount", {
    header: () => <div className="text-right">Monto</div>,
    cell: ({ row }) => {
      const amount = row.getValue("requestedAmount") as number;
      return (
        <div className="text-right font-medium">
          {new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
          }).format(amount)}
        </div>
      );
    },
  }),
  columnHelper.accessor("termMonths", {
    header: "Plazo (meses)",
    cell: ({ row }) => `${row.getValue("termMonths")} meses`,
  }),
  columnHelper.accessor("status", {
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as LoanApplication["status"];
      return (
        <Badge variant={STATUS_VARIANT[status]}>
          {status === "pending"
            ? "Pendiente"
            : status === "approved"
              ? "Aprobado"
              : "Rechazado"}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Fecha",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString("es-MX"),
  }),
]);
