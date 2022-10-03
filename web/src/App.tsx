import { useEffect, useState } from "react";
import axios from "axios";

import logoImg from "./assets/logo-nlw-esports.svg";
import { GameBanner } from "./components/GamerBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";

import { SpinnerGap, CaretRight, CaretLeft } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./styles/main.css";
import GetGameAdModal from "./components/GetGameAdModal";

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

  const [sliderDataLoaded, setSliderDataLoaded] = useState(false);
  const [sliderCreated, setSliderCreated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [gameAdsByID, setGameAdsByID] = useState<string | undefined>(undefined);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      /**
       * Timeout used only for presentation purpose
       */
      setTimeout(() => {
        setGames(response.data);
        setSliderDataLoaded(true);
      }, 500);
    });
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: "free",
      slides: {
        number: games.length,
        perView: 5,
        spacing: 15,
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          setSliderCreated(true);
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  console.log(gameAdsByID);
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">
      <img src={logoImg} alt="logo" className="animate-pulse" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <Dialog.Root>
        <GetGameAdModal gameId={gameAdsByID} />

        <div className="w-[100%] mt-16 relative flex items-center justify-center">
          <div className="w-[90%] z-0">
            <div className="keen-slider" ref={sliderRef}>
              {sliderDataLoaded ? (
                games.map((game) => {
                  return (
                    <GameBanner
                      key={game.id}
                      setGameAdsById={() => setGameAdsByID(game.id)}
                      bannerUrl={game.bannerUrl}
                      title={game.title}
                      adsCount={game._count.ads}
                    />
                  );
                })
              ) : (
                <SpinnerGap className="w-10 h-10 mx-auto my-8 animate-spin text-violet-500" />
              )}
            </div>
          </div>
          {sliderDataLoaded && sliderCreated && instanceRef.current && (
            <>
              <button
                className="delay 100 w-auto h-[100%] left-0 absolute z-10 cursor-pointer rounded-tl text-left text-violet-900 hover:text-violet-500"
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
              >
                <CaretLeft className=" w-20 h-20 shadow" />
              </button>

              <button
                className="delay-100 w-auto h-[100%] right-0 absolute z-10 cursor-pointer rounded-tr text-violet-900 hover:text-violet-500"
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
              >
                <CaretRight
                  className=" w-20 h-20  shadow"
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                />
              </button>
            </>
          )}
        </div>
      </Dialog.Root>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
