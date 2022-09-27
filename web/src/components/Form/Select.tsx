import { forwardRef, ReactNode } from "react";
import { Check, ArrowDown, ArrowUp } from "phosphor-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Controller, FieldValues } from "react-hook-form";

interface SelectProps {
  defaultValue?: string | undefined;
  id: string;
  name: string;
  label?: string;
  control: FieldValues | any;
  children: ReactNode;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ children, label, ...rest }: SelectProps, forwardedRef) => {
    return (
      <Controller
        {...rest}
        render={({ field }) => (
          <SelectPrimitive.Root
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectPrimitive.Trigger
              ref={forwardedRef}
              className="bg-zinc-900 py-3 px-4 rounded text-sm text-left placeholder:text-zinc-500 flex justify-between items-center"
            >
              <SelectPrimitive.Value placeholder={label} />
              <SelectPrimitive.Icon>
                <ArrowDown className="text-violet-500 w-4 h-4" />
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>

            <SelectPrimitive.Portal>
              <SelectPrimitive.Content className="bg-zinc-900 rounded border border-zinc-700">
                <SelectPrimitive.ScrollUpButton className="flex items-center justify-center p-2 border border-zinc-800">
                  <ArrowUp className="text-violet-500" />
                </SelectPrimitive.ScrollUpButton>

                <SelectPrimitive.Viewport className="p-5">
                  {children}
                </SelectPrimitive.Viewport>

                <SelectPrimitive.ScrollDownButton className="flex items-center justify-center p-2 border border-zinc-800">
                  <ArrowDown className="text-violet-500 w-4 h-4" />
                </SelectPrimitive.ScrollDownButton>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>
        )}
      />
    );
  }
);

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }: SelectItemProps, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        {...props}
        ref={forwardedRef}
        className="text-sm text-white rounded flex items-center h-6 px-8 my-1 relative select-none cursor-pointer hover:text-violet-200 hover:bg-violet-500"
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className="absolute left-0 w-5 inline-flex items-center justify-center">
          <Check className="text-violet-500" />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  }
);

interface GroupLabelProps {
  children: ReactNode;
}
export const SelectGroup = ({ children }: GroupLabelProps) => (
  <SelectPrimitive.Group className="pb-2">
    {children}
  </SelectPrimitive.Group>  
);

export const SelectGroupLabel = ({ children }: GroupLabelProps) => (
  <SelectPrimitive.Label className=" text-sm text-zinc-400 flex items-center h-6 px-4 my-1 relative">
    {children}
  </SelectPrimitive.Label>
);
