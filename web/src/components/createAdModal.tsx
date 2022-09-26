import { FormEvent, useEffect, useState } from "react";
import { Check, GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Input } from "./Form/Input";
import { Game } from "../App";

export function CreateAdModal() {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  function handleCreateAt(event: FormEvent) {
    event.preventDefault();
    console.log("envio form");

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    console.log(data);
    console.log(weekDays);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAt} className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="game">Qual o game?</label>
            <Select.Root name="game">
              <Select.Trigger
                id="game"
                name="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm text-left placeholder:text-zinc-500"
              >
                <Select.Value placeholder="Selecione o game que deseja jogar" />
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className=" bg-zinc-900 rounded border border-zinc-700">
                  <Select.ScrollUpButton />
                  <Select.Viewport className="p-5">
                    <Select.Item
                      key="-1"
                      value=""
                      className="text-sm text-zinc-500 rounded flex items-center h-6 px-8 relative select-none"
                      disabled
                    >
                      <Select.ItemText>
                        Selecione o game que deseja jogar
                      </Select.ItemText>
                      <Select.ItemIndicator className="absolute left-0 w-5 inline-flex items-center justify-center">
                        <Check />
                      </Select.ItemIndicator>
                    </Select.Item>
                    {games.map((game) => (
                      <Select.Item
                        key={game.id}
                        value={game.id}
                        className="text-sm text-white rounded flex items-center h-6 px-8 my-1 relative select-none cursor-pointer hover:text-violet-200 hover:bg-violet-500"
                      >
                        <Select.ItemText>{game.title}</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-0 w-5 inline-flex items-center justify-center">
                          <Check className="text-violet-500" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Como te chamam dentro do game?"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                id="discord"
                name="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                id="weekDays"
                type="multiple"
                className="grid grid-cols-4 gap-1"
                onValueChange={setWeekDays}
                value={weekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded bg-zinc-900 ${
                    weekDays.includes("0") ? "bg-violet-500" : ""
                  }`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded bg-zinc-900 ${
                    weekDays.includes("1") ? "bg-violet-500" : ""
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded bg-zinc-900 ${
                    weekDays.includes("2") ? "bg-violet-500" : ""
                  }`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded bg-zinc-900 ${
                    weekDays.includes("3") ? "bg-violet-500" : ""
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded bg-zinc-900 ${
                    weekDays.includes("4") ? "bg-violet-500" : ""
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded bg-zinc-900 ${
                    weekDays.includes("5") ? "bg-violet-500" : ""
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded bg-zinc-900 ${
                    weekDays.includes("6") ? "bg-violet-500" : ""
                  }`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="hourStart"
                  name="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              id="useVoiceChannel"
              name="useVoiceChannel"
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
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
