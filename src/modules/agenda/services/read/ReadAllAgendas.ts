import IAgendaRepository from "../../data/repositories/IAgendaRepository";

import IAgenda from "../../data/models/IAgenda";

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