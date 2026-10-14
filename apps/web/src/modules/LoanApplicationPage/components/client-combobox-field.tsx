import { useMemo, useState } from "react";
import type { FieldValues, Path } from "react-hook-form";

import {
  BaseField,
  type BaseFieldProps,
} from "../../../shared/components/form-field/base-field";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus,
} from "../../../shared/components/ui/combobox";
import { useDebounce } from "../../../shared/hooks/use-debounce";
import { useClientsInfiniteQuery } from "../api/queries/use-clients-infinite-query";
import type { ClientComboboxOption } from "../types/client-combobox-option.type";

type ClientComboboxFieldProps<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
> = BaseFieldProps<TFieldValues, Path<TFieldValues>, TTransformedValues> & {
  placeholder?: string;
};

export function ClientComboboxField<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
>({
  placeholder,
  control,
  name,
  ...props
}: ClientComboboxFieldProps<TFieldValues, TTransformedValues>) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] =
    useState<ClientComboboxOption | null>(null);
  const debouncedSearch = useDebounce(searchInput);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
  } = useClientsInfiniteQuery({
    limit: 20,
    search: debouncedSearch.trim() || undefined,
  });

  const items = useMemo(() => {
    const options: ClientComboboxOption[] =
      data?.pages.flatMap((page) =>
        page.items.map((client) => ({
          value: String(client.id),
          label: client.fullName,
          dni: client.dni,
        })),
      ) ?? [];

    if (
      selectedOption &&
      !options.some((option) => option.value === selectedOption.value)
    ) {
      return [selectedOption, ...options];
    }

    return options;
  }, [data, selectedOption]);

  const isSearching = isPending || (isFetching && !isFetchingNextPage);

  return (
    <BaseField {...props} control={control} name={name}>
      {({ field, fieldState }) => {
        const selected =
          items.find((option) => option.value === field.value) ??
          (selectedOption?.value === field.value ? selectedOption : null);

        return (
          <Combobox
            items={items}
            value={selected}
            filter={null}
            isItemEqualToValue={(item, value) => item.value === value.value}
            onValueChange={(next) => {
              field.onChange(next?.value ?? "");
              setSelectedOption(next);
              setSearchInput("");
            }}
            onInputValueChange={(next, { reason }) => {
              if (
                reason === "input-change" ||
                reason === "input-clear" ||
                reason === "clear-press"
              ) {
                setSearchInput(next);
              }
            }}
          >
            <ComboboxInput
              id={props.id}
              placeholder={placeholder}
              className="w-full"
              disabled={field.disabled}
              aria-invalid={Boolean(fieldState.error) || undefined}
              showClear
              onBlur={() => {
                field.onBlur();
              }}
            />
            <ComboboxContent aria-busy={isFetching || undefined}>
              <ComboboxStatus>
                {error
                  ? error.message
                  : isSearching
                    ? "Buscando..."
                    : isFetchingNextPage
                      ? "Cargando más..."
                      : null}
              </ComboboxStatus>
              <ComboboxEmpty>
                {isSearching || error ? null : "No se encontraron clientes."}
              </ComboboxEmpty>
              <ComboboxList
                onScroll={(event) => {
                  const list = event.currentTarget;
                  const remaining =
                    list.scrollHeight - list.scrollTop - list.clientHeight;

                  if (remaining < 48 && hasNextPage && !isFetchingNextPage) {
                    void fetchNextPage();
                  }
                }}
              >
                {(option) => (
                  <ComboboxItem key={option.value} value={option}>
                    <span className="truncate">{option.label}</span>
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
