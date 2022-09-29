import { ReactNode } from "react";
import { Warning } from "phosphor-react";
import * as TogglePrimitive from "@radix-ui/react-toggle-group";
import { Controller, FieldError, FieldValues } from "react-hook-form";

interface ToggleProps {
  defaultValue?: string | undefined;
  id: string;
  name: string;
  label?: string;
  control: FieldValues | any;
  children: ReactNode;
  rules?: Object;
  invalid?: FieldError | undefined;
}

export const Toggle = ({ children, label, invalid, ...rest }: ToggleProps) => {
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
        render={({ field: { name, value, ref, onChange, onBlur } }) => {
          return (
            <TogglePrimitive.Root
              value={value}
              onValueChange={onChange}
              id={name}
              ref={ref}
              onBlur={onBlur}
              type="multiple"
              className="grid grid-cols-4 gap-1"
            >
              {children}
            </TogglePrimitive.Root>
          );
        }}
      />
    </div>
  );
};

interface ToggleItemProps {
  value: string;
  title: string;
  children: ReactNode;
}

export const ToggleItem = ({ value, title, children }: ToggleItemProps) => {
  return (
    <TogglePrimitive.Item
      value={value}
      title={title}
      className="w-8 h-8 rounded bg-zinc-900"
    >
      {children}
    </TogglePrimitive.Item>
  );
};
