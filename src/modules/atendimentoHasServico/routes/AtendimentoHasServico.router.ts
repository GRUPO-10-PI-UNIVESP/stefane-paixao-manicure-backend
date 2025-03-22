import Router from "express";
import AtendimentoHasServicoCtrl from "../controller/AtendimentoHasServicoCtrl";

const router = Router();

router.post("/addServicoAtendimento", new AtendimentoHasServicoCtrl().addServiceToAtendimento);
router.delete("/removeServicoAtendimento", new AtendimentoHasServicoCtrl().removeServiceToAtendimento);
router.get("/getServicoAtendimento", new AtendimentoHasServicoCtrl().getAtendimentoHasServico);
router.get("/getServicosAtendimento", new AtendimentoHasServicoCtrl().getServicosFromAtendimento);
router.get("/getMoreFrequentServices", new AtendimentoHasServicoCtrl().getMoreFrequentServices);

export default router;
