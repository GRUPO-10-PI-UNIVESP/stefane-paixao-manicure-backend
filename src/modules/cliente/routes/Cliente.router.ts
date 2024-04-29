//importa o método de roteamento
import Router from "express";

//controle para vincular os métodos às rotas
import ClienteController from "../controller/ClienteController";

//instancia a rota
const router = Router();


//roteamento
router.post("/cliente", new ClienteController().create);
router.patch("/cliente/:clienteId", new ClienteController().update);
router.delete("/cliente/:clienteId", new ClienteController().delete);
router.get("/clienteByName/:name", new ClienteController().readByName);
router.get("/clienteByTelefone/:phone", new ClienteController().readByPhone);
router.get("/clientes", new ClienteController().readClientes);

//exporta o módulo de rota
export default router;