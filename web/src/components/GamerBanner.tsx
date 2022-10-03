import * as Dialog from "@radix-ui/react-dialog";

import { Game } from "../App";

interface GameBannerProps {
  game: Game;
  setSelectedGame: (game: Game) => void;
}

export function GameBanner({ game, setSelectedGame }: GameBannerProps) {
  return (
    <Dialog.Trigger
      onClick={() => setSelectedGame(game)}
      className="relative rounded-lg overflow-hidden keen-slider__slide animate-show hover:border border-violet-500 hover:saturate-200"
    >
      <img src={game.bannerUrl} alt={game.title} />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{game.title}</strong>
        <span className="text-sm text-zinc-300 block">
          {game._count.ads} anúncios(s)
        </span>
      </div>
    </Dialog.Trigger>
  );
}
