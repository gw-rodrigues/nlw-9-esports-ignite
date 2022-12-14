import { Warning } from "phosphor-react";
import { InputHTMLAttributes } from "react";
import { Controller, FieldError, FieldValues } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string | undefined;
  id: string;
  name: string;
  control: FieldValues | any;
  rules?: Object;
  invalid: FieldError | undefined;
}

export function Input({
  name,
  control,
  defaultValue,
  rules,
  invalid,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-4 relative mt-2">
      {invalid && (
        <div className="flex items-center gap-2 text-xs text-red-400 absolute top-[-16px] right-0 ">
          <Warning />
          {invalid.message ? invalid.message : "Obrigatório."}
        </div>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { name, value, ref, onChange, onBlur } }) => (
          <input
            name={name}
            onChange={onChange}
            ref={ref}
            onBlur={onBlur}
            defaultValue=""
            {...rest}
            className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 ${
              invalid ? "border border-red-400" : ""
            }`}
          />
        )}
      />
    </div>
  );
}
