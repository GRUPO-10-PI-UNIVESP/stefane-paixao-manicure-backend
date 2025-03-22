import {Router} from "express";
import FuncionarioRouterExpressImpl from "./FuncionarioRouterExpressImpl";

const router = Router();

router.post(`/funcionario/`, new FuncionarioRouterExpressImpl().funcionarioCreateRouterExpress);
router.patch(`/funcionario/:funcionarioId`, new FuncionarioRouterExpressImpl().funcionarioUpdateRouterExpress);
router.delete(`/funcionario/:funcionarioId`, new FuncionarioRouterExpressImpl().funcionarioDeleteRouterExpress);
router.get(`/funcionario/:funcionarioId`, new FuncionarioRouterExpressImpl().funcionarioFindUniqueRouterExpress);
router.get(`/funcionarioByName/:funcionarioNome`, new FuncionarioRouterExpressImpl().funcionarioFindUniqueByNameRouterExpress);
router.get(`/funcionarios/`, new FuncionarioRouterExpressImpl().funcionarioReadAllRouterExpress);

export default router;