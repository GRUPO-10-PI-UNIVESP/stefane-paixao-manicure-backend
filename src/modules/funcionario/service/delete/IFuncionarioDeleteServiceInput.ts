import IFuncionarioView from "../../interface/view/IFuncionarioView";
import IFuncionario from "../../model/IFuncionario";

export default interface IFuncionarioDeleteServiceInput
{
    execute(id: number): Promise<void>;
}