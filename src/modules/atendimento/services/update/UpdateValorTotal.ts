import IAtendimentoHasServico from "../../../atendimentoHasServico/data/models/IAtendimentoHasServico";
import AtendimentoHasServicoRepository from "../../../atendimentoHasServico/data/repositories/AtendimentoHasServicoRepository";
import GetServicosFromAtendimento from "../../../atendimentoHasServico/services/get/GetServicosFromAtendimento";
import AtendimentoRepository from "../../data/repositories/AtendimentoRepository";
import UpdateAtendimento from "./UpdateAtendimento";

//serviço de cálculo dos valores dos serviços
export default class UpdateValorTotal
{
    //método para calcular o valor dos serviços em um atendimento
    async updateValorTotal(atendimentoId: number): Promise<void>
    {
        const servicos: IAtendimentoHasServico[] = await new GetServicosFromAtendimento(new AtendimentoHasServicoRepository()).execute(atendimentoId);
        
        let valores: number = 0;

        if(servicos.length != 0)
        {
            for(let i = 0; i < servicos.length; i ++)
            {
                valores += + servicos[i].servico.valorServico;
            }
        }
        //montando o objeto atendimento para sua atualização
        let atendimento: any =  {valorTotal: valores};

        //injeta o repositório no serviço passando a atualização do atendimento e seu respectivo id
        await new UpdateAtendimento(new AtendimentoRepository()).execute(atendimento, atendimentoId)
    }
}