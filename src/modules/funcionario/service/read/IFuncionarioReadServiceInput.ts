import IFuncionarioView from "../../interface/view/IFuncionarioView";

export default interface IFuncionarioReadServiceInput 
{
    execute<T>(param?: T, options?: {[key: string | number]: any}): Promise<IFuncionarioView>;
}