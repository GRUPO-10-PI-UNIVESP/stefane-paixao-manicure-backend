//importa a inteface para definir os tipos dos objetos
import IAtendimento from "../models/IAtendimento";

//cria e exporta a interface de repository
export default interface IAtendimentoRepository 
{
    //assinatura dos métodos
    create(atendimento: IAtendimento): Promise<IAtendimento>;
    update(atendimento: IAtendimento, atendimentoId: number): Promise<void>;
    delete(atendimentoId: number): Promise<void>;
    getUnique(atendimentoId: number): Promise<IAtendimento>;
    getAll(): Promise<IAtendimento[]>;
    getMoreFrequentClients(): Promise<IAtendimento[]>;
}