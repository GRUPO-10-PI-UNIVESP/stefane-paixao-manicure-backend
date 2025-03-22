import IFuncionario from "../../model/IFuncionario";

export default interface IFuncionarioRepository 
{
    create(funcionario: IFuncionario): Promise<void>;
    update(funcionario: IFuncionario, id: number): Promise<void>;
    delete(id: number): Promise<void>;
    readUnique(id: number): Promise<IFuncionario>;
    readUniqueByName(nome: string): Promise<IFuncionario>;
    readAll(): Promise<IFuncionario>;
}