import IAtendimentoHasServico from "../../data/models/IAtendimentoHasServico";
import IAtendimentoHasServicoRepository from "../../data/repositories/IAtendimentoHasServicoRepository";

//exporta e cria o serviço de remoção de serviço de um atendimento
export default class GetServicosFromAtendimento {
  //repositório que receberá a dependência
  private atendimentoHasServicoRepository: IAtendimentoHasServicoRepository;

  //construtor injetando a dependência de repository no service
  constructor(
    atendimentoHasServicoRepository: IAtendimentoHasServicoRepository
  ) {
    //dependência injetada
    this.atendimentoHasServicoRepository = atendimentoHasServicoRepository;
  }

  //executa o serviço, envia os ids de serviço e atendimento para obter a entidade associativa
  async execute(atendimentoId: number): Promise<IAtendimentoHasServico[]> {
    return await this.atendimentoHasServicoRepository.getServicesFromAtendimento(
      atendimentoId
    );
  }
}
