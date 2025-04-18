import IAgendaRepository from "../../data/repositories/IAgendaRepository";

export default class DeleteAgenda {
  private agendaRepository: IAgendaRepository;

  constructor(agendaRepository: IAgendaRepository) {
    this.agendaRepository = agendaRepository;
  }

  async execute(agendaId: number): Promise<void> {
    await this.agendaRepository.delete(agendaId);
  }
}
