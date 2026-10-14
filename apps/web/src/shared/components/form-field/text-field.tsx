"use client";

import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";

import { Input } from "../ui/input";
import { BaseField, type BaseFieldProps } from "./base-field";

type TextFieldProps<TFieldValues extends FieldValues> =
  BaseFieldProps<TFieldValues> & {
    placeholder?: string;
    type?: ComponentProps<"input">["type"];
  };

export const TextField = <TFieldValues extends FieldValues>({
  placeholder,
  type = "text",
  control,
  name,
  ...props
}: TextFieldProps<TFieldValues>) => {
  return (
    <BaseField {...props} control={control} name={name}>
      {({ field }) => (
        <Input
          {...field}
          type={type}
          placeholder={placeholder}
          onBlur={() => {
            field.onBlur();
          }}
        />
      )}
    </BaseField>
  );
};
