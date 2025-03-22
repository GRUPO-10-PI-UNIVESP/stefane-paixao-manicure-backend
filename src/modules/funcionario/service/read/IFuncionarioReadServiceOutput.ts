import IFuncionarioView from "../../interface/view/IFuncionarioView";
import IFuncionario from "../../model/IFuncionario";

export default interface IFuncionarioReadServiceOutput
{
    present(funcionario: IFuncionario): Promise<IFuncionarioView>
}