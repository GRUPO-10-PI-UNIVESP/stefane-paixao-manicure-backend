//método especial de roteamento
import Router from "express";

//importar as rotas
import clienteRouter from "../../modules/cliente/routes/Cliente.router";
import agendaRouter from "../../modules/agenda/routes/Agenda.routes";
import servicoRouter from "../../modules/servico/routes/Servico.router";
import atendimentoRouter from "../../modules/atendimento/routes/Atendimento.router";
import loginRouter from "../../modules/login/routes/Login.router";
import atendimentoHasServicoRouter from "../../modules/atendimentoHasServico/routes/AtendimentoHasServico.router";
import filialRouter from "../../modules/filial/routes/Filial.routes";
import enderecoRouter from "../../modules/endereco/routes/Endereco.routes";
import funcionarioRouter from "../../modules/funcionario/plugin/router/FuncionarioRouterExpress";


//instancia a rota
const routes = Router();

//usando os módulos de rotas
routes.use(clienteRouter);
routes.use(agendaRouter);
routes.use(servicoRouter);
routes.use(atendimentoRouter);
routes.use(loginRouter);
routes.use(atendimentoHasServicoRouter);
routes.use(filialRouter);
routes.use(enderecoRouter);
routes.use(funcionarioRouter);

//exporta as rotas 
export default routes;

