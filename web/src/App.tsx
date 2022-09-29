import { useEffect, useState } from "react";
import axios from "axios";

import logoImg from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GamerBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";

import { SpinnerGap } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./styles/main.css";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [sliderCreated, setSliderCreated] = useState(false);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      /**
       * Timeout used only for presentation purpose
       */
      setTimeout(() => {
        setGames(response.data);
        setSliderCreated(true);
      }, 500);
    });
  }, []);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      number: games.length,
      perView: 6,
      spacing: 15,
    },
    created() {},
  });

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">
      <img src={logoImg} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="keen-slider mt-16" ref={sliderRef}>
        {sliderCreated ? (
          games.map((game, index) => {
            return (
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
                animationDelay={index}
              />
            );
          })
        ) : (
          <SpinnerGap className="w-10 h-10 mx-auto my-8 animate-spin text-violet-500" />
        )}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
