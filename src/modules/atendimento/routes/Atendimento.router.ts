//importa o router para instanciar o arquivo de rota
import Router from "express";
import AtendimentoController from "../controller/AtendimentoController";

//inicia o módulo de rota
const router = Router();

//definição das rotas
router.post("/atendimento", new AtendimentoController().create);
router.patch("/atendimento/:atendimentoId", new AtendimentoController().update);
router.delete("/atendimento/:atendimentoId", new AtendimentoController().delete);
router.get("/atendimento/:atendimentoId", new AtendimentoController().getUnique);
router.get("/atendimentos", new AtendimentoController().getAll);

//exporta o módulo de rota
export default router;
