//método especial de roteamento
import Router from "express";

//importar as rotas
import clienteRouter from "../../modules/cliente/routes/Cliente.router";
import agendaRouter from "../../modules/agenda/routes/Agenda.routes";
import servicoRouter from "../../modules/servico/routes/Servico.router";
import atendimentoRouter from "../../modules/atendimento/routes/Atendimento.router";

//instancia a rota
const routes = Router();

routes.use(clienteRouter);
routes.use(agendaRouter);
routes.use(servicoRouter);
routes.use(atendimentoRouter);

//exporta as rotas 
export default routes;

