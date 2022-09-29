import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle } from "phosphor-react";

interface CreateAdModalSubmittedProps {
  handleCloseDialog: () => void;
}

export function CreateAdModalSubmitted({
  handleCloseDialog,
}: CreateAdModalSubmittedProps) {
  return (
    <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]">
      <Dialog.Title className="text-3xl font-black">
        Anúncio enviado com sucesso
      </Dialog.Title>
      <CheckCircle className="w-20 h-20 mx-auto my-10 text-green-500" />
      <div className="text-sm py-4">
        Parabéns seu anúncio foi enviado com sucesso.
      </div>
      <footer className="mt-2 flex gap-4 justify-end">
        <Dialog.Close
          type="button"
          className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
          onClick={handleCloseDialog}
        >
          Fechar
        </Dialog.Close>
      </footer>
    </Dialog.Content>
  );
}
