import { Check } from "phosphor-react";
import * as SelectRadix from "@radix-ui/react-select";
import { Controller, FieldValues } from "react-hook-form";
import { Children, ReactNode } from "react";

interface SelectProps {
  name: string;
  control: FieldValues | any;
  children: ReactNode;
  defaultValue?: string | undefined;
  label: string;
}

function SelectComponent({
  children,
  label,
  defaultValue,
  ...rest
}: SelectProps) {
  return (
    <Controller
      {...rest}
      render={({ field }) => (
        <SelectRadix.Root {...field} defaultValue={defaultValue}>
          <SelectRadix.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm text-left placeholder:text-zinc-500">
            <SelectRadix.Value placeholder="Selecione o game que deseja jogar" />
          </SelectRadix.Trigger>

          <SelectRadix.Portal>
            <SelectRadix.Content className=" bg-zinc-900 rounded border border-zinc-700">
              <SelectRadix.ScrollUpButton />
              <SelectRadix.Viewport className="p-5">
                {children}
              </SelectRadix.Viewport>
              <SelectRadix.ScrollDownButton />
            </SelectRadix.Content>
          </SelectRadix.Portal>
        </SelectRadix.Root>
      )}
    />
  );
}

SelectComponent.Group = SelectRadix.Group;

interface GroupLabelProps {
  children: ReactNode;
}
SelectComponent.GroupLabel = ({ children }: GroupLabelProps) => (
  <SelectRadix.Label className=" text-sm text-zinc-400 flex items-center h-6 px-4 my-1 relative">
    {children}
  </SelectRadix.Label>
);

SelectComponent.Item = (props: any) => {
  const { value, text, ...rest } = props;
  return (
    <SelectRadix.Item
      key={value}
      value={value}
      {...rest}
      className="text-sm text-white rounded flex items-center h-6 px-8 my-1 relative select-none cursor-pointer hover:text-violet-200 hover:bg-violet-500"
    >
      <SelectRadix.ItemText>{text}</SelectRadix.ItemText>
      <SelectRadix.ItemIndicator className="absolute left-0 w-5 inline-flex items-center justify-center">
        <Check className="text-violet-500" />
      </SelectRadix.ItemIndicator>
    </SelectRadix.Item>
  );
};

export { SelectComponent as Select };
