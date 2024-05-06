import IAtendimentoHasServicoRepository from "../../data/repositories/IAtendimentoHasServicoRepository";

//cria e exporta o serviço de adição de serviço ao atendimento
export default class AddServiceToAtendimento
{
    //repositório que receberá a dependência
    private atendimentoHasServicoRepository: IAtendimentoHasServicoRepository;

    //construtor injetando a dependência de repository no service
    constructor(atendimentoHasServicoRepository: IAtendimentoHasServicoRepository)
    {
        //dependência injetada
        this.atendimentoHasServicoRepository = atendimentoHasServicoRepository;
    }

    //executa o serviço, envia os ids de serviço e atendimento à associação
    async execute(servicoId: number, atendimentoId: number): Promise<void>
    {
        console.log("executou o caso de uso")
        this.atendimentoHasServicoRepository.addServiceToAtendimento(servicoId, atendimentoId);
    }
}