//importa a interface de repository para aplicar a inversão de controle
import IServicoRepository from "../../data/repositories/IServicoRepository";

//cria e exporta a classe de deleção de serviço
export default class DeleteServico {
  //objeto repository com acomplamento abstrato
  private servicoRepository: IServicoRepository;

  //construtor injetando a dependência no objeto
  constructor(servicoRepository: IServicoRepository) {
    this.servicoRepository = servicoRepository;
  }

  //executa o servico e envia o id recebido ao repository
  async execute(servicoId: number): Promise<void> {
    await this.servicoRepository.delete(servicoId);
  }
}
