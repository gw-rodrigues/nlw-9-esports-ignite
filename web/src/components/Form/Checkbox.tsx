import { forwardRef } from "react";
import { Check } from "phosphor-react";
import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { Controller, FieldValues } from "react-hook-form";

interface CheckBoxProps {
  name: string;
  control: FieldValues | any;
}

export const Checkbox = forwardRef<HTMLDivElement, CheckBoxProps>(
  ({ ...rest }: CheckBoxProps, forwardedRef) => {
    return (
      <Controller
        {...rest}
        render={({ field }) => (
          <CheckboxRadix.Root
            {...field}
            value={undefined}
            checked={field.value}
            onCheckedChange={field.onChange}
            className="w-6 h-6 p-1 rounded bg-zinc-900"
          >
            <CheckboxRadix.Indicator>
              <Check className="w-4 h-4 text-emerald-400" />
            </CheckboxRadix.Indicator>
          </CheckboxRadix.Root>
        )}
      />
    );
  }
);
