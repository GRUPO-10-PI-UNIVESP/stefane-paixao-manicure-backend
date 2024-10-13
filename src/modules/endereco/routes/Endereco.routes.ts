import express  from "express";
import enderecoCtrl from "../controller/EnderecoCtrl";

const enderecoRouter = express.Router();

enderecoRouter.post("/endereco", new enderecoCtrl().add);
enderecoRouter.patch("/endereco/:enderecoId", new enderecoCtrl().update);
enderecoRouter.delete("/endereco/:enderecoId", new enderecoCtrl().delete);
enderecoRouter.get("/endereco/:enderecoId", new enderecoCtrl().findUnique);
enderecoRouter.get("/enderecos", new enderecoCtrl().findAll);

export default enderecoRouter;