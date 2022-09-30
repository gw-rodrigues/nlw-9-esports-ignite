import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useEffect, useState } from "react";

interface GetGameAdModal {
  gameId: string | undefined;
}

interface GameAds {
  id: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string[];
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
}

export default function GetGameAdModal({ gameId }: GetGameAdModal) {
  const [gameAds, setGameAds] = useState<GameAds[]>([]);

  useEffect(() => {
    if (!gameId) return;
    axios(`http://localhost:3333/games/${gameId}/ads`).then((response) => {
      /**
       * Timeout used only for presentation purpose
       */
      setGameAds(response.data);
      setTimeout(() => {}, 500);
    });
  }, [gameId]);
  console.log(gameAds);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]">
        <Dialog.Title className="text-3xl font-black">
          {gameAds.map((ads: any) => (
            <div key={ads.id}>{ads.name}</div>
          ))}
        </Dialog.Title>
        <footer className="mt-2 flex gap-4 justify-end">
          <Dialog.Close
            type="button"
            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
          >
            Fechar
          </Dialog.Close>
        </footer>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
