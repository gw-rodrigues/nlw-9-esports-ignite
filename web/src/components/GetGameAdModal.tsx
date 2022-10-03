import { useEffect, useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";

import { Game } from "../App";
import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import {
  CaretLeft,
  CaretRight,
  SpinnerGap,
  User,
  UserCircle,
} from "phosphor-react";

interface GetGameAdModal {
  game: Game;
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

export default function GetGameAdModal({ game }: GetGameAdModal) {
  const [gameAds, setGameAds] = useState<GameAds[]>([]);

  const [isGameAdsLoaded, setIsGameAdsLoaded] = useState(false);

  useEffect(() => {
    if (!game) return;

    axios(`http://localhost:3333/games/${game.id}/ads`).then((response) => {
      /**
       * Timeout used only for presentation purpose
       */
      setTimeout(() => {
        setGameAds(response.data);
        setIsGameAdsLoaded(true);
      }, 500);
    });
  }, [game]);

  const [gameAdsSliderRef, gameAdsSliderInstanceRef] =
    useKeenSlider<HTMLDivElement>({
      initial: 0,
      loop: true,
      slides: {
        number: gameAds.length,
        perView: 1,
        spacing: 15,
      },
    });

  console.log(gameAds);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]">
        <div className="w-[100%] h-52 overflow-hidden my-4 rounded-lg">
          <img
            className="w-[100%] h-auto"
            src={game.bannerUrl}
            alt={game.title}
          />
        </div>

        <Dialog.Title className="text-3xl font-black">
          {game.title}
        </Dialog.Title>
        <h3>Conecte-se e comece a jogar!</h3>

        <div className="w-[100%] relative mt-10 flex justify-center items-center">
          <div className=" w-[60%]">
            {gameAds && isGameAdsLoaded ? (
              <div className="keen-slider z-0 relative" ref={gameAdsSliderRef}>
                {gameAds.map((ads: GameAds) => (
                  <div key={ads.id} className="keen-slider__slide">
                    <UserCircle className=" w-14 h-14 text-zinc-300 mx-auto" />
                    <strong className="w-[100%] text-center font-bold text-white block mx-auto">
                      {ads.name}
                    </strong>
                    <div className="mt-2 min-h-[150px] flex flex-col gap-2 bg-violet-500 hover:bg-violet-600 rounded p-4 text-white">
                      <p>
                        <span className="text-sm text-zinc-300 pr-2">
                          Joga há
                        </span>
                        {ads.yearsPlaying === 1
                          ? `${ads.yearsPlaying} ano`
                          : `${ads.yearsPlaying} anos`}
                      </p>

                      <p>
                        <span className="text-sm text-zinc-300 pr-2">
                          Dias semana:
                        </span>
                        {ads.weekDays.sort().toString()}
                      </p>

                      <p>
                        <span className="text-sm text-zinc-300 pr-2">
                          Entre
                        </span>
                        {`${ads.hourStart} as ${ads.hourEnd}`}
                      </p>

                      <p>
                        <span className="text-sm text-zinc-300 pr-2">
                          Usa chat de voz:
                        </span>
                        {ads.useVoiceChannel ? "sim" : "nao"}
                      </p>

                      <p>
                        <span className="text-sm text-zinc-300 pr-2">
                          Discord:
                        </span>
                        {ads.discord}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <SpinnerGap className="w-10 h-10 mx-auto my-8 animate-spin text-violet-500" />
            )}
          </div>

          {isGameAdsLoaded &&
            gameAds.length > 2 &&
            gameAdsSliderInstanceRef.current && (
              <>
                <button
                  className="delay 100 w-auto h-[100%] left-0 absolute z-10 cursor-pointer rounded-tl text-left text-violet-900 hover:text-violet-500"
                  onClick={(e: any) =>
                    e.stopPropagation() ||
                    gameAdsSliderInstanceRef.current?.prev()
                  }
                >
                  <CaretLeft className=" w-20 h-20" />
                </button>

                <button
                  className="delay-100 w-auto h-[100%] right-0 absolute z-10 cursor-pointer rounded-tr text-violet-900 hover:text-violet-500"
                  onClick={(e: any) =>
                    e.stopPropagation() ||
                    gameAdsSliderInstanceRef.current?.prev()
                  }
                >
                  <CaretRight
                    className=" w-20 h-20"
                    onClick={(e: any) =>
                      e.stopPropagation() ||
                      gameAdsSliderInstanceRef.current?.next()
                    }
                  />
                </button>
              </>
            )}
        </div>

        <div className="m-6">
          Existe{" "}
          <span
            className={`font-bold mx-1 ${
              gameAds.length === 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {gameAds.length}{" "}
          </span>
          jogador
          {`${gameAds.length > 1 ? "es" : ""} a procura.`}
        </div>

        <footer className="mt-8 flex gap-4 justify-end">
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
