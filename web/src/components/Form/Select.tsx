import React, { forwardRef, ReactNode } from "react";
import { Check, ArrowDown, ArrowUp, Warning } from "phosphor-react";
import { Controller, FieldError, FieldValues } from "react-hook-form";

interface SelectProps {
  defaultValue?: string | undefined;
  id: string;
  name: string;
  label?: string;
  control: FieldValues | any;
  children: ReactNode;
  rules?: Object;
  invalid?: FieldError | undefined;
}

export const Select = ({
  children,
  defaultValue,
  label,
  invalid,
  ...rest
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1 relative mt-2">
      {invalid && (
        <div className="flex items-center gap-2 text-xs text-red-400 absolute top-[-16px] right-0 ">
          <Warning />
          {invalid.message ? invalid.message : "Obrigatório."}
        </div>
      )}
      <Controller
        {...rest}
        defaultValue={defaultValue ? defaultValue : ""}
        render={({ field: { name, value, ref, onChange, onBlur } }) => (
          <select
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            className={`  bg-zinc-900 py-3 px-4 rounded  text-sm text-left placeholder:text-zinc-500 flex justify-between items-center ${
              invalid ? "border border-red-400" : ""
            }`}
            placeholder={label}
          >
            {label && (
              <option value="" disabled>
                {label}
              </option>
            )}
            {children}
          </select>
        )}
      />
    </div>
  );
};

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

export const SelectItem = ({ children, ...props }: SelectItemProps) => {
  return <option {...props}>{children}</option>;
};
