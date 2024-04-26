import IAgenda from "../../data/models/IAgenda";
import IAgendaRepository from "../../data/repositories/IAgendaRepository";

export default class CreateAgenda
{
    private agendaRepository: IAgendaRepository;

    constructor(agendaRepository: IAgendaRepository)
    {
        this.agendaRepository = agendaRepository;
    }

    async execute(agenda: IAgenda): Promise<void>
    {
        this.agendaRepository.create(agenda);
    }
}