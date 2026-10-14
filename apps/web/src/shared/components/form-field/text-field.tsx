"use client";

import type { ComponentProps } from "react";
import type { FieldValues, Path } from "react-hook-form";

import { Input } from "../ui/input";
import { BaseField, type BaseFieldProps } from "./base-field";

type TextFieldProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = BaseFieldProps<TFieldValues, Path<TFieldValues>, TTransformedValues> &
  Pick<ComponentProps<"input">, "placeholder" | "type" | "step">;

export function TextField<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
>({
  placeholder,
  type = "text",
  step,
  control,
  name,
  ...props
}: TextFieldProps<TFieldValues, TTransformedValues>) {
  return (
    <BaseField {...props} control={control} name={name}>
      {({ field }) => (
        <Input
          {...field}
          id={props.id}
          type={type}
          step={step}
          placeholder={placeholder}
          onBlur={() => {
            field.onBlur();
          }}
        />
      )}
    </BaseField>
  );
}
