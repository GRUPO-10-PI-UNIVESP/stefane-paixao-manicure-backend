import IFuncionarioView from "../../interface/view/IFuncionarioView";
import IFuncionario from "../../model/IFuncionario";

export default interface IFuncionarioDeleteServiceOutput 
{
    present(funcionario: IFuncionario): Promise<IFuncionarioView>;
}