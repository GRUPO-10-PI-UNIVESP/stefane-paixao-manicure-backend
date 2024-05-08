//importação do framework express
import express from "express";

//importando as rotas definidas no arquivo de rotas em http
import routes from "./src/shared/http/routes";

//adiciona à constante um objeto que contém o express framework API e todas suas configurações básicas à inicialização da aplicação
const app = express();

///middleware do epxress que converte a requisição body para JSON
app.use(express.json());

//middleware do express que converte apenas quando o body está em formato urlencoded e o content-type do header está de acordo com o type do body enviado
app.use(express.urlencoded({ extended: true }));

//adiciona ao APP às rotas
app.use(routes);

//porta de comunicação da aplicação
app.listen(5000, () => {
  console.log("Listening at 5000");
});
