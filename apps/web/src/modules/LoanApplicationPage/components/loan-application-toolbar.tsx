import { CreateLoanApplicationDialog } from "./create-loan-application-dialog";
import { StatusFilter } from "./status-filter";

type LoanApplicationToolbarProps = {
  status: string;
  onStatusChange: (value: string) => void;
};

export const LoanApplicationToolbar = ({
  status,
  onStatusChange,
}: LoanApplicationToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <StatusFilter value={status} onChange={onStatusChange} />
      <CreateLoanApplicationDialog />
    </div>
  );
};
