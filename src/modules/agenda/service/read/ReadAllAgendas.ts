import IAgendaRepository from "../../data/repository/IAgendaRepository";

import IAgenda from "../../data/model/IAgenda";

export default class ReadAllAgendas
{
    private agendaRepository: IAgendaRepository;

    constructor(agendaRepository: IAgendaRepository)
    {
        this.agendaRepository = agendaRepository;
    }

    async execute(): Promise<IAgenda[]>
    {
        return this.agendaRepository.getAllAgendas();
    }
}