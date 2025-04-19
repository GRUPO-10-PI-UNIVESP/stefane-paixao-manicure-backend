//importa o router para instanciar o arquivo de rota
import Router from "express";
import AtendimentoController from "../controller/AtendimentoController";

import express, { Request, Response } from 'express';
import prisma from "../../../shared/prisma/prismaClient";

//inicia o módulo de rota
const router = Router();

//definição das rotas
router.post("/atendimento", new AtendimentoController().create);
router.patch("/atendimento/:atendimentoId", new AtendimentoController().update);
router.delete("/atendimento/:atendimentoId", new AtendimentoController().delete);
router.get("/atendimento/:atendimentoId", new AtendimentoController().getUnique);
router.get("/atendimentos", new AtendimentoController().getAll);

//obter os clientes mais frequentes da empresa
router.get("/getMoreFrequentClients/", new AtendimentoController().getMoreFrequentClients);

//obter os atendimentos do último ano
router.get("/atendimentosFromLastYear", new AtendimentoController().getAtendimentosFromLastYear);

//obter o faturamento total dos atendimentos
router.get("/getTotalMoney", new AtendimentoController().getTotalMoney);

//obter o faturamento de cada mês
router.get("/getTotalMoneyPorMes", new AtendimentoController().getTotalPorMes);

//obter os serviços mais frequentes
router.get("/getMoreFrequentServices", new AtendimentoController().getMoreFrequentServices);

//obter os serviços mais frequentes por cliente
router.get("/getMoreFrequentServicesByClient", new AtendimentoController().getMoreFrequentServicesByClients);

//obter os atendimentos do último ano por filial
router.get("/atendimentosFromLastYearByFilial", new AtendimentoController().getAtendimentosFromLastYearByFilial);

//obter o faturamento dos atendimentos por filial
router.get("/getTotalMoneyPorAtendimentoByFilial", new AtendimentoController().getTotalMoneyByFilial);

//obter o faturamento por mês de cada filial
router.get("/getTotalMoneyPorMesByFilial", new AtendimentoController().getTotalPorMesPorFilial);

//obter os serviços mais frequentes por filial
router.get("/getMoreFrequentServicesByFilial", new AtendimentoController().getMoreFrequentServicesByClientsByFilial);

//obter os serviços mais frequents por cliente e filial
router.get("/getMoreFrequentServicesByClientByFilial", new AtendimentoController().getMoreFrequentServicesByClientsByFilial);

//obter os valores gastos por clientes
router.get("/getMoneySpentByClient", new AtendimentoController().getTotalSpentByClient);

//exporta o módulo de rota
export default router;
