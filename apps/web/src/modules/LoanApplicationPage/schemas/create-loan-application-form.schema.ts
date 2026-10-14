import { z } from "zod";
import { LOAN_APPLICATION_STATUS } from "../constants/loan-status.constants";

const requiredString = (message: string) =>
  z.string().trim().min(1, { error: message, abort: true });

export const createLoanApplicationFormSchema = z.object({
  clientId: requiredString("El cliente es obligatorio")
    .refine(
      (value) => {
        const parsed = Number(value);
        return Number.isInteger(parsed) && parsed > 0;
      },
      { error: "Debe ser un entero positivo", abort: true },
    )
    .transform(Number),
  requestedAmount: requiredString("El monto es obligatorio")
    .regex(/^\d+(\.\d{1,2})?$/, {
      error: "Máximo 2 decimales",
      abort: true,
    })
    .refine((value) => Number(value) > 0, {
      error: "Debe ser un número positivo",
      abort: true,
    })
    .transform(Number),
  termMonths: requiredString("El plazo es obligatorio")
    .refine(
      (value) => {
        const parsed = Number(value);
        return Number.isInteger(parsed) && parsed >= 1 && parsed <= 360;
      },
      { error: "Debe ser un entero entre 1 y 360", abort: true },
    )
    .transform(Number),
  status: z.enum(LOAN_APPLICATION_STATUS, "El estado es obligatorio"),
});

export type CreateLoanApplicationFormValues = z.input<
  typeof createLoanApplicationFormSchema
>;

export type CreateLoanApplicationFormOutput = z.output<
  typeof createLoanApplicationFormSchema
>;
