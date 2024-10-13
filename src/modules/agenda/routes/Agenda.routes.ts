//importação do express
import express from "express";

//importação do mediator para vinculá-lo às rotas
import AgendaController from "../controller/AgendaController";

//instancia a rota pelo método de roteamento do express
const router = express.Router();

//definição do roteamento
router.post("/agenda/", new AgendaController().create);
router.patch("/agenda/:agendaId", new AgendaController().update);
router.delete("/agenda/:agendaId", new AgendaController().delete);
router.get("/agendaAvailables", new AgendaController().getAgendaAvailable);
router.get("/agendas", new AgendaController().readAllAgendas);

//exporta a rota
export default router;