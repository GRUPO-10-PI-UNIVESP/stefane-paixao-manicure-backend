import Funcionario from "./Funcionario";
import IFuncionario from "./IFuncionario";

export default class FuncionarioFactory 
{
    getInstance(data: IFuncionario): Funcionario
    {
        if(data)
        {
            return new Funcionario(data.id, data.nome, data.cpf, data.admissao, data.desligamento, data.cargo, data.salario, data.endereco);
        }

        throw new Error("Não foi possível criar o funcionário.");
    }
}