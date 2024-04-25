import IAgenda from "../model/IAgenda";

export default interface IAgendaRepository
{
    create(agenda: IAgenda): Promise<void>;
    update(agenda: IAgenda, agendaId: number): Promise<void>;
    delete(agendaId: number): Promise<void>;
    getAvailableAgenda(): Promise<IAgenda[]>;
    getAllAgendas(): Promise<IAgenda[]>;
}