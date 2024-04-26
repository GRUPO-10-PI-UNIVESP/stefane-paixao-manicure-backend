import IAgenda from "../../data/models/IAgenda";
import IAgendaRepository from "../../data/repositories/IAgendaRepository";

export default class ReadAgendasAvailable
{
    private agendaRepository: IAgendaRepository;

    constructor(agendaRepository: IAgendaRepository)
    {
        this.agendaRepository = agendaRepository;
    }

    async execute(): Promise<IAgenda[]>
    {
        return this.agendaRepository.getAvailableAgenda();
    }
}