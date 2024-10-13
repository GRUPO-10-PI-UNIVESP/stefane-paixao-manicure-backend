//interface de serviço para a tipagem dos objetos
import IServico from "../models/IServico";

//interface com os métodos a serem implementados por Repository
export default interface IServicoRepository
{
    create(servico: IServico): Promise<void>;
    update(servico: IServico, servicoId: number): Promise<void>;
    delete(servicoId: number): Promise<void>;
    getUnique(servicoId: number): Promise<IServico>;
    getAll(): Promise<IServico[]>;
}