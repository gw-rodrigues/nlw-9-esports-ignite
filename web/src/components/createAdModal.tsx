import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import { Input } from "./Form/Input";
import { Game } from "../App";
import { Checkbox } from "./Form/Checkbox";
import { Select, SelectItem } from "./Form/Select";
import { Toggle, ToggleItem } from "./Form/Toggle";

interface GameFormProps {
  game: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string[];
  hourEnd: string;
  hourStart: string;
  useVoiceChannel: boolean;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<GameFormProps>();

  const onSubmit: SubmitHandler<GameFormProps> = (data) => {
    console.log(data);
  };

  async function handleCreateAt(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data?.name) {
      return;
    }

    try {
      axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourEnd: data.hourEnd,
        hourStart: data.hourStart,
        useVoiceChannel: useVoiceChannel,
      });
      alert("Anúncio criado com sucesso!");
    } catch (error) {
      alert("Error ao criar anúncio!");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>
        <form
          onSubmit={handleSubmit((data) => console.log(data))}
          className="flex flex-col gap-8 mt-8"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="game">Qual o game?</label>

            <Select
              id="game"
              name="game"
              control={control}
              label="Selecione o game que deseja jogar"
              rules={{ required: "selecione um jogo" }}
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
              rules={{ required: "coloque seu nome" }}
              type="text"
              placeholder="Como te chamam dentro do game?"
              invalid={errors.name}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                control={control}
                rules={{ required: "coloque seu nome" }}
                invalid={errors.yearsPlaying}
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                id="discord"
                name="discord"
                control={control}
                rules={{ required: "coloque seu nome" }}
                invalid={errors.discord}
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          
            <div className="flex flex-col gap-3">
              <label htmlFor="weekDays">Quais dias costumas jogar?</label>
                
              <Toggle id="weekDays" name="weekDays" control={control}>
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

            <div className="flex flex-col gap-4 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>

              <div className="flex gap-2 items-center justify-between">
                <label htmlFor="hourStart" className="text-sm">
                  De:
                </label>
                <Input
                  id="hourStart"
                  name="hourStart"
                  control={control}
                  rules={{ required: true }}
                  invalid={errors.hourStart}
                  type="time"
                  placeholder="De"
                />

                <label htmlFor="hourEnd" className="text-sm">
                  Até:
                </label>
                <Input
                  id="hourEnd"
                  name="hourEnd"
                  control={control}
                  rules={{ required: true }}
                  invalid={errors.hourEnd}
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox name="useVoiceChannel" control={control} />
            Costumo me conectar ao chat de voz.
          </label>

          <footer className="mt-2 flex gap-4 justify-end">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} className="w-6 h-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
