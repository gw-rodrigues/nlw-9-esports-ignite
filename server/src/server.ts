/**
 * !!! quando usamos o prisma com "tsnd ..." no package.json devemos adicionar mais um comando
 * comando completo:
 *
 *  "dev": "tsnd --exit-child src/server.ts",
 *
 * conexão com database previne a reinicialização do nosso server, assim fechará todas conexões, reiniciar e cria um nova conexão
 */
import express from "express";

/**
 * Cors - serve para proteger no aplicação, contra frontend que nao queremos que tenha acesso ao nosso server.
 *  - Quais endereços frontend que podem ter acesso nosso backend.
 *  - Se nao for configurado nenhum frontend vai ter acesso ao nosso servidor app.
 * = npm i cors
 * = npm i @types/cors -D (tipos typescript)
 */
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHoursToMinutes } from "./utils/convert-hours-to-minutes";
import { convertMinutesToHours } from "./utils/convert-minutes-to-hours";

/**
 * Iniciar rotas com express
 *
 * Indicamos ao express para usar método JSON
 */
const app = express();
app.use(express.json());

/**
 * app.use(cors()) === todos frontend terão acesso ao nosso servidor
 * 
 * app.use(cors({
  origin:"qual endereço tem acesso, ex: http://rockseat.com.br"
}));
 */
app.use(cors());

/**
 * Ciar nova conexão do prisma com database
 * - pode receber objetos de configurações
 * - neste caso vamos usar logs para poder identificar falhas/erros/outro
 * log: ["query"] -> mostra todas a query feitas
 */
const prisma = new PrismaClient({ log: ["query"] });
/**
 * Alguns métodos no prisma sao assíncrono, sendo assim devemos usar async/awawit
 * ex: game.findMany() -> assíncrono método
 *
 * na função adicionamos os async e no método do prisma o await
 */

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    //search all
    include: {
      // = join
      _count: {
        // agradador count / sera novo campo / key - value no json
        select: {
          //campo/relacionamento ads
          ads: true,
        },
      },
    },
  });
  /**
   * como o retorno prisma e uma lista, de games, podemos retornar diretamente no .json(games)
   */
  return response.json(games);
});

app.post("/games/:id/ads", async (request, response) => {
  /**
   * nessa rota vamos criar os ads para os game.
   *
   * quando for fazer inserção, cardaste sensíveis usamos:
   * request body
   *
   * valores recebidos através do método post
   * {
   *   "name": "fake-name-1",
   *   "yearsPlaying": 1,
   *   "discord": "fake-discord#000",
   *   "weekdays": [4,5,6],
   *   "hourStart": 1080,
   *   "hourEnd": 1320,
   *   "useVoiceChannel": true
   * }
   */
  const gameId = request.params.id;
  const body: any = request.body;

  /**
   * validação com "zod javascript"
   */

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHoursToMinutes(body.hourStart),
      hourEnd: convertHoursToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      //select = quais campos queremos mostrar
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      //where val = database field value
      gameId, //como params gameId e igual a campo da database, passamos apenas gameId, se nao era -{ gameId : id}
    },
    orderBy: {
      // ordem dos valores mostrado, sendo desc os últimos adicionados
      createdAt: "desc",
    },
  });

  /**
   * Iremos formatar os valores recebidos na hora retorno
   */
  return response.json(
    ads.map((ad: any) => {
      return {
        ...ad, //pegamos todos os valores
        weekDays: ad.weekDays.split(","), //mas alteramos apenas esse key-value do ad / como e uma string vamos fazer split para passar para um array, cada dia da semana
        hourStart: convertMinutesToHours(ad.hourStart),
        hourEnd: convertMinutesToHours(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;
  /**
   * prisma findUnique - pode receber valores inválidos, como null or invalid, que pode causar erros.
   * prisma findUniqueOrThrow - caso for valor invalido disparamos um error, nao retornamos a response.
   */
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      // selecionamos apenas o campo discord para ser retornado da query
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return response.json({ discord: ad.discord });
});

app.listen(3333);
