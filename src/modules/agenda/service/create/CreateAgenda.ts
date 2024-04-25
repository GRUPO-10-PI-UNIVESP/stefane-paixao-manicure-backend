import IAgenda from "../../data/model/IAgenda";
import IAgendaRepository from "../../data/repository/IAgendaRepository";

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