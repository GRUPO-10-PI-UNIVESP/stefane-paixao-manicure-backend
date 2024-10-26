//importa a interface para tipar os objetos da entidade associativa
import IAtendimentoHasServico from "../../data/models/IAtendimentoHasServico";

//importa o serviço de listar uma associação de atendimento e serviço
import GetAtendimentoHasServico from "../get/GetAtendimentoHasServico";

//importa o repositório para injetá-lo no serviço
import AtendimentoHasServicoRepository from "../../data/repositories/AtendimentoHasServicoRepository";

//importa a interface de repositório para a inversão de controle
import IAtendimentoHasServicoRepository from "../../data/repositories/IAtendimentoHasServicoRepository";

//exporta e cria o serviço de remoção de serviço de um atendimento
export default class RemoveServiceFromAtendimento {
  //repositório que receberá a dependência
  private atendimentoHasServicoRepository: IAtendimentoHasServicoRepository;

  //construtor injetando a dependência de repository no service
  constructor(
    atendimentoHasServicoRepository: IAtendimentoHasServicoRepository
  ) {
    //dependência injetada
    this.atendimentoHasServicoRepository = atendimentoHasServicoRepository;
  }

  //executa o serviço, envia os ids de serviço e atendimento à associação
  async execute(servicoId: number, atendimentoId: number): Promise<void> {
    //busca o id da entidade associativa de atendimento e serviço
    const atendimentoHasServico: IAtendimentoHasServico =
      await new GetAtendimentoHasServico(
        new AtendimentoHasServicoRepository()
      ).execute(servicoId, atendimentoId);

    //se o objeto existe, então segue para excluir
    if (atendimentoHasServico?.atendimentoHasServicoId != null) {
      await this.atendimentoHasServicoRepository.removeServiceFromAtendimento(
        atendimentoHasServico?.atendimentoHasServicoId
      );
    }
    //não existe, então não há serviço para ser removido do atendimento
    else {
      //emite exceção
      throw new Error("O serviço não está vinculado a este atendimento.");
    }
  }
}
