import IAgendaRepository from "../../data/repository/IAgendaRepository";

export default class DeleteAgenda
{
    private agendaRepository: IAgendaRepository;

    constructor(agendaRepository: IAgendaRepository)
    {
        this.agendaRepository = agendaRepository;
    }

    async execute(agendaId: number): Promise<void>
    {
        this.agendaRepository.delete(agendaId);
    }
}
