import IFuncionarioView from "../../interface/view/IFuncionarioView";
import IFuncionario from "../../model/IFuncionario";

export default interface IFuncionarioUpdateServiceInput
{
    execute(funcionario: IFuncionario, id: number): Promise<IFuncionarioView>;
}