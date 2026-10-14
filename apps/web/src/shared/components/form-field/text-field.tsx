"use client";

import type { ComponentProps } from "react";
import type { FieldValues, Path } from "react-hook-form";

import { Input } from "../ui/input";
import { BaseField, type BaseFieldProps } from "./base-field";

type TextFieldProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = BaseFieldProps<TFieldValues, Path<TFieldValues>, TTransformedValues> &
  Pick<ComponentProps<"input">, "placeholder" | "type" | "step" | "min" | "max">;

export function TextField<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
>({
  placeholder,
  type = "text",
  step,
  min,
  max,
  control,
  name,
  ...props
}: TextFieldProps<TFieldValues, TTransformedValues>) {
  const minNumber = min === undefined ? undefined : Number(min);
  const maxNumber = max === undefined ? undefined : Number(max);
  const blocksNegative = minNumber !== undefined && minNumber >= 0;

  return (
    <BaseField {...props} control={control} name={name}>
      {({ field }) => (
        <Input
          {...field}
          id={props.id}
          type={type}
          step={step}
          min={min}
          max={max}
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (blocksNegative && event.key === "-") {
              event.preventDefault();
            }
          }}
          onChange={(event) => {
            const next = event.target.value;

            if (blocksNegative && next.includes("-")) {
              return;
            }

            if (next !== "") {
              const parsed = Number(next);

              if (
                !Number.isNaN(parsed) &&
                ((minNumber !== undefined && parsed < minNumber) ||
                  (maxNumber !== undefined && parsed > maxNumber))
              ) {
                return;
              }
            }

            field.onChange(next);
          }}
          onBlur={() => {
            field.onBlur();
          }}
        />
      )}
    </BaseField>
  );
}
