//importa método especial do express para a inicialização de roteamento 
import Router from "express";

//importação do mediator que contém as rotas
import ServicoController from "../controller/ServicoController";

//instancia a constante de rotas
const router = Router();

//definindo as rotas com seus mediators
router.post("/servico", new ServicoController().create);
router.patch("/servico/:servicoId", new ServicoController().update);
router.delete("/servico/:servicoId", new ServicoController().delete);
router.get("/servico/:servicoId", new ServicoController().getUnique);
router.get("/servicos/", new ServicoController().getAll);

//exporta o módulo de roteamento
export default router;
