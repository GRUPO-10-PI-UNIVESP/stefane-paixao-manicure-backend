import IFuncionarioView from "../../interface/view/IFuncionarioView";
import IFuncionario from "../../model/IFuncionario";

export default interface IFuncionarioCreateServiceOutput
{
    present(funcionario: IFuncionario): Promise<IFuncionarioView>;
}