//importa a interface de login para a tipagem
import ILogin from "../../data/models/ILogin";

//importa a interface de repository para aplicação da inversão de controle
import ILoginRepository from "../../data/repositories/ILoginRepository";

//exporta e cria o serviço
export default class DeleteLogin
{
    //injetando a dependência via construtor no serviço
    constructor(private loginRepository: ILoginRepository)
    {}

    //executa o serviço
    async execute(loginId: number): Promise<void>
    {
        //passa à camada de persistência o id do login a ser removido no banco de dados
        this.loginRepository.delete(loginId);
    }
}