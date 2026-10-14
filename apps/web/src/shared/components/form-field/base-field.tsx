import React from "react";
import type {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";

export type BaseFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  description?: string;
  isRequired?: boolean;
  id?: string;
};

type InnerBaseFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> & {
  children: (props: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
  }) => React.ReactNode;
};

export const BaseField = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  children,
  isRequired = false,
  id,
}: InnerBaseFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-disabled={Boolean(field.disabled)}
          data-invalid={Boolean(fieldState.error)}
        >
          <FieldLabel htmlFor={id}>
            {label}
            {isRequired ? (
              <span className="text-red-500"> *</span>
            ) : (
              <span className="text-gray-500"> (opcional)</span>
            )}
          </FieldLabel>
          {children({
            field,
            fieldState,
          })}
          {description ? (
            <FieldDescription>{description}</FieldDescription>
          ) : null}
          {fieldState.error ? (
            <FieldError>{fieldState.error.message}</FieldError>
          ) : null}
        </Field>
      )}
    />
  );
};
