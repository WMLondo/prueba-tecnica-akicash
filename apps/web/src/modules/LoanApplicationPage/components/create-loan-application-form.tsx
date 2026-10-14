import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SelectField } from "../../../shared/components/form-field/select-field";
import { TextField } from "../../../shared/components/form-field/text-field";
import { Button } from "../../../shared/components/ui/button";
import { useCreateLoanApplicationCommand } from "../api/commands/use-create-loan-application-command";
import { LOAN_STATUS_OPTIONS } from "../constants/loan-status-options.constants";
import { LOAN_APPLICATION_STATUS } from "../constants/loan-status.constants";
import {
  createLoanApplicationFormSchema,
  type CreateLoanApplicationFormOutput,
  type CreateLoanApplicationFormValues,
} from "../schemas/create-loan-application-form.schema";

type CreateLoanApplicationFormProps = {
  onSuccess?: () => void;
};

export const CreateLoanApplicationForm = ({
  onSuccess,
}: CreateLoanApplicationFormProps) => {
  const { control, handleSubmit, reset } = useForm<
    CreateLoanApplicationFormValues,
    unknown,
    CreateLoanApplicationFormOutput
  >({
    resolver: zodResolver(createLoanApplicationFormSchema),
    defaultValues: {
      clientId: "",
      requestedAmount: "",
      termMonths: "",
      status: LOAN_APPLICATION_STATUS.PENDING,
    },
  });

  const {
    mutate,
    isPending,
    error,
    reset: resetMutation,
  } = useCreateLoanApplicationCommand();

  const onSubmit = (values: CreateLoanApplicationFormOutput) => {
    resetMutation();

    mutate(values, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        id="clientId"
        control={control}
        name="clientId"
        label="ID del cliente"
        type="number"
        isRequired
        placeholder="1"
      />
      <TextField
        id="requestedAmount"
        control={control}
        name="requestedAmount"
        label="Monto solicitado"
        type="number"
        isRequired
        placeholder="10000.00"
      />
      <TextField
        id="termMonths"
        control={control}
        name="termMonths"
        label="Plazo (meses)"
        type="number"
        isRequired
        placeholder="12"
      />
      <SelectField
        id="status"
        control={control}
        name="status"
        label="Estado"
        isRequired
        options={LOAN_STATUS_OPTIONS}
      />
      {error ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Creando..." : "Crear solicitud"}
      </Button>
    </form>
  );
};
