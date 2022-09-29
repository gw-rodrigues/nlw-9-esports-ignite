import { Check, Warning } from "phosphor-react";
import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { Controller, FieldError, FieldValues } from "react-hook-form";

interface CheckBoxProps {
  name: string;
  control: FieldValues | any;
  rules?: Object;
  invalid?: FieldError | undefined;
  defaultValue?: string | undefined;
}

export const Checkbox = ({ invalid, defaultValue, ...rest }: CheckBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      {invalid && (
        <div className="flex items-center gap-2 text-xs text-red-400">
          <Warning />
          {invalid.message ? invalid.message : "Obrigatório."}
        </div>
      )}
      <Controller
        {...rest}
        defaultValue={defaultValue ? defaultValue : false}
        render={({ field: { name, value, ref, onChange, onBlur } }) => (
          <CheckboxRadix.Root
            value={value}
            checked={value}
            onCheckedChange={onChange}
            ref={ref}
            onBlur={onBlur}
            className={`w-6 h-6 p-1 rounded bg-zinc-900 ${
              invalid && "border border-red-400"
            }`}
          >
            <CheckboxRadix.Indicator>
              <Check className="w-4 h-4 text-emerald-400" />
            </CheckboxRadix.Indicator>
          </CheckboxRadix.Root>
        )}
      />
    </div>
  );
};
