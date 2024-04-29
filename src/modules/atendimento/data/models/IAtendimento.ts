//importa as intefaces de Agenda e Cliente para tipar seus objetos agregados dentro de atendimento
import IAgenda from "../../../agenda/data/models/IAgenda";
import ICliente from "../../../cliente/data/models/ICliente";

//cria e exporta a interface da atendimento para a execução da tipagem 
export default interface IAtendimento
{
    atendimentoId: number;
    clienteId: number;
    agendaId: number;
    valorTotal: number;

}