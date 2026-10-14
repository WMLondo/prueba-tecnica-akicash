import type { FieldValues, Path } from "react-hook-form";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { BaseField, type BaseFieldProps } from "./base-field";

type SelectOption = {
  readonly value: string;
  readonly label: string;
};

type SelectFieldProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = BaseFieldProps<TFieldValues, Path<TFieldValues>, TTransformedValues> & {
  options: readonly SelectOption[];
  placeholder?: string;
};

export function SelectField<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
>({
  options,
  placeholder,
  control,
  name,
  ...props
}: SelectFieldProps<TFieldValues, TTransformedValues>) {
  const items = [...options];

  return (
    <BaseField {...props} control={control} name={name}>
      {({ field, fieldState }) => {
        const selected =
          items.find((option) => option.value === field.value) ?? null;

        return (
          <Combobox
            items={items}
            value={selected}
            onValueChange={(next) => {
              field.onChange(next?.value ?? "");
            }}
          >
            <ComboboxInput
              id={props.id}
              placeholder={placeholder}
              className="w-full"
              disabled={field.disabled}
              aria-invalid={Boolean(fieldState.error) || undefined}
              onBlur={() => {
                field.onBlur();
              }}
            />
            <ComboboxContent>
              <ComboboxEmpty>No se encontraron resultados.</ComboboxEmpty>
              <ComboboxList>
                {(option) => (
                  <ComboboxItem key={option.value} value={option}>
                    {option.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        );
      }}
    </BaseField>
  );
}
