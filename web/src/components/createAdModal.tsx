import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "./Form/Input";
import { Game } from "../App";
import { Checkbox } from "./Form/Checkbox";
import { Select, SelectItem } from "./Form/Select";
import { Toggle, ToggleItem } from "./Form/Toggle";
import { CreateAdModalSubmitted } from "./CreateAdModalSubmitted";
import CreateAdModalSubmitting from "./CreateAdModalSubmitting";

interface GameAdsProps {
  game: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string[];
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
}
const regex = "^[a-zA-Z]+#.*$";
const schema = z.object({
  game: z.string().min(1, { message: "Selecione um jogo." }),
  name: z
    .string({ required_error: "Coloque seu nome / nickname." })
    .min(3, { message: "Nome / nickname min 3 carácteres." }),
  yearsPlaying: z.string({ required_error: "Obrigatório." }),
  discord: z
    .string({ required_error: "Coloque seu discord." })
    .min(8, { message: "Discord min 7 carácteres." })
    .regex(RegExp("^[a-zA-Z]+#[0-9][0-9][0-9][0-9]$"), {
      message: "Discord está inválido.",
    }),
  weekDays: z
    .array(z.string(), { required_error: "Selecione 1 ou vários dias." })
    .min(1, { message: "Obrigatório selecionar 1 ou vários dias." }),
  hourEnd: z.string({ required_error: "Obrigatório." }),
  hourStart: z.string({ required_error: "Obrigatório." }),
  useVoiceChannel: z.boolean(),
});

export function CreateAdModal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<GameAdsProps>({
    resolver: zodResolver(schema),
  });

  async function handleCreateAt({
    game,
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourEnd,
    hourStart,
    useVoiceChannel,
  }: GameAdsProps) {
    setIsSubmitting(true);
    try {
      axios.post(`http://localhost:3333/games/${game}/ads`, {
        name,
        yearsPlaying: Number(yearsPlaying),
        discord,
        weekDays: weekDays ? weekDays.map(Number) : -1,
        hourEnd,
        hourStart,
        useVoiceChannel,
      });

      /**
       * Timeout used only for presentation
       */
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 2000);
    } catch (error) {
      alert("Error ao criar anúncio!");
    }
  }

  function handleCloseDialog() {
    reset();
    setIsSubmitted(false);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed animate-[show_0.2s_ease-in]" />
      {!isSubmitting && !isSubmitted && (
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 bg-[#2A2634] text-white rounded-lg w-[95vw] max-w-[480px] animate-[show_0.2s_ease-in]">
          <Dialog.Title className="text-lg sm:text-3xl font-black px-6 sm:px-10">
            Publique um anúncio
          </Dialog.Title>

          <form
            onSubmit={handleSubmit(handleCreateAt)}
          >
            <div className="h-[60vh] relative overflow-y-auto bg-scroll px-4 sm:px-10 flex flex-col gap-8 my-8 py-8 border-t border-b border-zinc-700">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="game">Qual o game?</label>

                <Select
                  id="game"
                  name="game"
                  control={control}
                  label="Selecione o game que deseja jogar"
                  invalid={errors.game}
                >
                  {games.map((game) => (
                    <SelectItem key={game.id} value={game.id}>
                      {game.title}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input
                  id="name"
                  name="name"
                  control={control}
                  type="text"
                  placeholder="Como te chamam dentro do game?"
                  invalid={errors.name}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input
                    id="yearsPlaying"
                    name="yearsPlaying"
                    control={control}
                    invalid={errors.yearsPlaying}
                    type="number"
                    min="0"
                    placeholder="Tudo bem ser ZERO"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input
                    id="discord"
                    name="discord"
                    control={control}
                    invalid={errors.discord}
                    type="text"
                    placeholder="Usuário#0000"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="weekDays">Quais dias costumas jogar?</label>

                <Toggle
                  id="weekDays"
                  name="weekDays"
                  control={control}
                  invalid={errors.weekDays}
                >
                  <ToggleItem value="0" title="Domingo">
                    D
                  </ToggleItem>
                  <ToggleItem value="1" title="Segunda">
                    S
                  </ToggleItem>
                  <ToggleItem value="2" title="Terça">
                    T
                  </ToggleItem>
                  <ToggleItem value="3" title="Quarta">
                    Q
                  </ToggleItem>
                  <ToggleItem value="4" title="Quinta">
                    Q
                  </ToggleItem>
                  <ToggleItem value="5" title="Sexta">
                    S
                  </ToggleItem>
                  <ToggleItem value="6" title="Sábado">
                    S
                  </ToggleItem>
                </Toggle>
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="hourStart">Qual horário do dia?</label>

                <div className="flex flex-wrap gap-2 justify-between">
                  <div className="flex gap-2 items-center">
                    <label htmlFor="hourStart" className="text-sm">
                      De:
                    </label>
                    <Input
                      id="hourStart"
                      name="hourStart"
                      control={control}
                      invalid={errors.hourStart}
                      type="time"
                      placeholder="De"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <label htmlFor="hourEnd" className="text-sm">
                      Até:
                    </label>
                    <Input
                      id="hourEnd"
                      name="hourEnd"
                      control={control}
                      invalid={errors.hourEnd}
                      type="time"
                      placeholder="Até"
                    />
                  </div>
                </div>
              </div>

              <label className="mt-4 flex items-center gap-2 text-sm">
                <Checkbox name="useVoiceChannel" control={control} />
                Costumo me conectar ao chat de voz.
              </label>
            </div>

            <footer className="mt-2 flex gap-2 sm:gap-4 justify-center sm:justify-end px-2 sm:px-10">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 px-2 sm:px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                onClick={() => reset()}
              >
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 px-2 sm:px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              >
                <GameController size={24} className="w-6 h-6" />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      )}
      {isSubmitting && <CreateAdModalSubmitting />}
      {isSubmitted && (
        <CreateAdModalSubmitted handleCloseDialog={handleCloseDialog} />
      )}
    </Dialog.Portal>
  );
}
