//método especial de roteamento
import Router from "express";

//importar as rotas
import clienteRouter from "../../modules/cliente/routes/Cliente.router";

//instancia a rota
const routes = Router();

routes.use(clienteRouter);

export default routes;

