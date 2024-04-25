//método especial de roteamento
import Router from "express";

//importar as rotas
import clienteRouter from "../../modules/cliente/routes/Cliente.router";
import agendaRouter from "../../modules/agenda/routes/Agenda.routes";

//instancia a rota
const routes = Router();

routes.use(clienteRouter);
routes.use(agendaRouter);

//exporta as rotas 
export default routes;

