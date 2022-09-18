/**
 * !!! quando usamos o prisma com "tsnd ..." no package.json devemos adicionar mais um comando
 * comando completo:
 *
 *  "dev": "tsnd --exit-child src/server.ts",
 *
 * conexão com database previne a reinicialização do nosso server, assim fechará todas conexões, reiniciar e cria um nova conexão
 */
import express from "express";
import { PrismaClient } from "@prisma/client";

/**
 * Iniciar rotas com express
 */
const app = express();
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
  const games = await prisma.game.findMany();
  /**
   * como o retorno prisma e uma lista, de games, podemos retornar diretamente no .json(games)
   */
  return response.json(games);
});

app.post("/games", (request, response) => {
  return response.status(201).json([]);
});

app.get("/games/:id/ads", (request, response) => {
  return response.json([
    { id: 1, name: "Anuncio 1" },
    { id: 2, name: "Anuncio 2" },
    { id: 3, name: "Anuncio 3" },
    { id: 4, name: "Anuncio 4" },
  ]);
});

app.get("/ads/:id/discord", (request, response) => {
  return response.json([]);
});

app.listen(3333);
