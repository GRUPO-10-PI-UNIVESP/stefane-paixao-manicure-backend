//importa a interface de repository para aplicar a inversão de controle
import IServicoRepository from "../../data/repositories/IServicoRepository";

//interface para tipar os objetos de Servico
import IServico from "../../data/models/IServico";

//cria e exporta a classe de criação de serviço
export default class CreateServico {
  //objeto repository com acomplamento abstrato
  private servicoRepository: IServicoRepository;

  //construtor injetando a dependência no objeto
  constructor(servicoRepository: IServicoRepository) {
    this.servicoRepository = servicoRepository;
  }

  //executa o servico e envia o objeto recebido ao repository
  async execute(servico: IServico): Promise<void> {
    await this.servicoRepository.create(servico);
  }
}
