import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../shared/components/ui/combobox";
import { Label } from "../../../shared/components/ui/label";
import { LOAN_STATUS_OPTIONS } from "../constants/loan-status-options.constants";
import type { StatusFilterOption } from "../types/status-filter-option.type";

type StatusFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

const STATUS_FILTER_ITEMS: StatusFilterOption[] = [...LOAN_STATUS_OPTIONS];

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  const selected =
    STATUS_FILTER_ITEMS.find((option) => option.value === value) ?? null;

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="status-filter">Filtrar por status</Label>
      <Combobox
        items={STATUS_FILTER_ITEMS}
        value={selected}
        onValueChange={(next) => {
          onChange(next?.value ?? "");
        }}
      >
        <ComboboxInput
          id="status-filter"
          placeholder="Todos los estados"
          className="w-full"
          showClear
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
    </div>
  );
};
