import IAgenda from "../models/IAgenda";

export default interface IAgendaRepository
{
    create(agenda: IAgenda): Promise<IAgenda>;
    update(agenda: IAgenda, agendaId: number): Promise<void>;
    delete(agendaId: number): Promise<void>;
    getAgenda(agendaID: number): Promise<IAgenda>;
    getAvailableAgenda(): Promise<IAgenda[]>;
    getAllAgendas(): Promise<IAgenda[]>;
}