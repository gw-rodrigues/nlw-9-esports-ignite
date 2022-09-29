import * as Dialog from "@radix-ui/react-dialog";
import { SpinnerGap } from "phosphor-react";

export default function CreateAdModalSubmitting() {
  return (
    <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]">
      <Dialog.Title className="text-3xl font-black">
        Enviando o anúncio...
      </Dialog.Title>
      <SpinnerGap className="w-10 h-10 animate-spin mx-auto my-10" />
      <div className="text-sm">
        Aguarde um momento, estamos a fazer registo do seu anúncio.
      </div>
    </Dialog.Content>
  );
}
