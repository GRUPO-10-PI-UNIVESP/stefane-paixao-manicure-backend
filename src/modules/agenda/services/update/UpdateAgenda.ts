import IAgenda from "../../data/models/IAgenda";
import IAgendaRepository from "../../data/repositories/IAgendaRepository";

export default class UpdateAgenda
{
    private agendaRepository: IAgendaRepository;

    constructor(agendaRepository: IAgendaRepository)
    {
        this.agendaRepository = agendaRepository;
    }

    async execute(agenda: IAgenda, agendaId: number): Promise<void>
    {
        this.agendaRepository.update(agenda, agendaId);
    }
}