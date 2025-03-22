import Funcionario from "../../model/Funcionario";

export default interface IFuncionarioCreateServiceInput
{
    execute(funcionario: Funcionario): Promise<any>;
}