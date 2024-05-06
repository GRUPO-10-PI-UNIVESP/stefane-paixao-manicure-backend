import IAtendimento from "../../../atendimento/data/models/IAtendimento";
import IServico from "../../../servico/data/models/IServico";

//cria e exporta a inteface associativa de atendimento e serviço
export default interface IAtendimentoHasServico
{
    atendimentoHasServicoId: number;
    // servicoId: number;
    // atendimentoId: number;
    servico: IServico;
    atendimento: IAtendimento;
}