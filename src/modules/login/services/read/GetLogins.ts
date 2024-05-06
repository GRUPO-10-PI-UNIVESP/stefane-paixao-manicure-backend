//importa a interface de login para a tipagem
import ILogin from "../../data/models/ILogin";

//importa a interface de repository para aplicação da inversão de controle
import ILoginRepository from "../../data/repositories/ILoginRepository";

//exporta e cria o serviço
export default class getLogins
{
    //injetando a dependência via construtor no serviço
    constructor(private loginRepository: ILoginRepository)
    {}

    //executa o serviço
    async execute(): Promise<ILogin[]>
    {
        //através da chamada à camada de persistência consulta-se todos os logins no banco de dados
        return this.loginRepository.buscarTodos();
    }
}