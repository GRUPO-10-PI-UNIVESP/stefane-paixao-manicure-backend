import Router from "express";
import ClienteController from "../controller/ClienteController";

const router = Router();

router.post("/cliente", new ClienteController().create);

router.patch("/cliente/:clienteId", new ClienteController().update);

router.delete("/cliente/:clienteId", new ClienteController().delete);

router.get("/clienteByName/:name", new ClienteController().readByName);

router.get("/clienteByTelefone/:phone", new ClienteController().readByPhone);

router.get("/clientes", new ClienteController().readClientes);

export default router;