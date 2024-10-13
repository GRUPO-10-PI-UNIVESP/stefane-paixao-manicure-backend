import express  from "express";
import FilialCtrl from "../controller/FilialCtrl";

const filialRouter = express.Router();

filialRouter.post("/filial", new FilialCtrl().add);
filialRouter.patch("/filial/:filialId", new FilialCtrl().update);
filialRouter.delete("/filial/:filialId", new FilialCtrl().delete);
filialRouter.get("/filial/:filialId", new FilialCtrl().findUnique);
filialRouter.get("/filiais", new FilialCtrl().findAll);

export default filialRouter;