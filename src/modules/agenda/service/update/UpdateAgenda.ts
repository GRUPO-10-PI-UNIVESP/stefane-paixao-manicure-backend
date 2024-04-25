import IAgenda from "../../data/model/IAgenda";
import IAgendaRepository from "../../data/repository/IAgendaRepository";

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