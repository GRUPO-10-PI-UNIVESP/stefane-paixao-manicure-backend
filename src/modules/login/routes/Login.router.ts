import Router from "express";
import LoginController from "../controller/LoginController";

const router = Router();

router.post("/login", new LoginController().create);
router.post("/validateLogin", new LoginController().validateLogin);
router.patch("/login/:loginId", new LoginController().update);
router.delete("/login/:loginId", new LoginController().delete);
router.get("/login/:loginId", new LoginController().getUnique);
router.get("/logins", new LoginController().getAll);

export default router;
