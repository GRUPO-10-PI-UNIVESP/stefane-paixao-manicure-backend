//importa a interface de login para a tipagem
import ILogin from "../../data/models/ILogin";

//importa a interface de repository para aplicação da inversão de controle
import ILoginRepository from "../../data/repositories/ILoginRepository";

//exporta e cria o serviço
export default class validateCredenciais
{
    //injetando a dependência via construtor no serviço
    constructor(private loginRepository: ILoginRepository)
    {}

    //executa o serviço
    async execute(usuario: string, senha: string): Promise<ILogin>
    {
        //passa à camada de persistência o id do login a ser consultado no banco de dados
        return this.loginRepository.logar(usuario, senha);
    }
}