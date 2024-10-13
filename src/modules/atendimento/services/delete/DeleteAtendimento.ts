//interface de repository para a inversão e controle
import IAtendimento from "../../data/models/IAtendimento";

//interface de repository
import IAtendimentoRepository from "../../data/repositories/IAtendimentoRepository";

//cria e exporta o service de criação do atendimento
export default class UpdateAtendimento {
  //repositório definido
  private atendimentoRepository: IAtendimentoRepository;

  //é injetado no serviço o repositório
  constructor(atendimentoRepository: IAtendimentoRepository) {
    this.atendimentoRepository = atendimentoRepository;
  }

  //executa o serviço que passa ao repositório o id do atendimento a ser deletado na base de dados
  async execute(atendimentoId: number): Promise<void> {
    await this.atendimentoRepository.delete(atendimentoId);
  }
}
