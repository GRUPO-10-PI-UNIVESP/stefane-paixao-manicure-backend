//importa a interface de repository para aplicar a inversão de controle
import IServicoRepository from "../../data/repositories/IServicoRepository";

//interface para tipar os objetos de Servico
import IServico from "../../data/models/IServico";

//cria e exporta a classe de atualização de serviço
export default class UpdateServico {
  //objeto repository com acomplamento abstrato
  private servicoRepository: IServicoRepository;

  //construtor injetando a dependência no objeto
  constructor(servicoRepository: IServicoRepository) {
    this.servicoRepository = servicoRepository;
  }

  //executa o servico e envia o objeto recebido e id ao repository
  async execute(servico: IServico, servicoId: number): Promise<void> {
    await this.servicoRepository.update(servico, servicoId);
  }
}
