import IAgenda from "../../data/model/IAgenda";
import IAgendaRepository from "../../data/repository/IAgendaRepository";

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