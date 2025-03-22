//importa a interface da entidade associativa para tipar os objetos
import IAtendimentoHasServico from "../models/IAtendimentoHasServico";

//cria e exporta a interface da associação
export default interface IAtendimentoHasServicoRepository
{
    //assinatura dos métodos
    addServiceToAtendimento(servicoId: number, atendimentoId: number): Promise<void>;
    removeServiceFromAtendimento(atendimentoHasServicoId: number): Promise<void>;
    getServicoHasAtendimento(servicoId: number, atendimentoId: number): Promise<IAtendimentoHasServico>
    getServicesFromAtendimento(atendimentoId: number): Promise<IAtendimentoHasServico[]>;
    getMoreFrequentServices(): Promise<IAtendimentoHasServico[]>;
}