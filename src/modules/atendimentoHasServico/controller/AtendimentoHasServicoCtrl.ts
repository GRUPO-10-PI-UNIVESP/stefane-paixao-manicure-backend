//importação do request e response para enviar e receber dados via protocolo http
import {Request, Response} from "express";

//importação da interface da entidade associativa
import IAtendimentoHasServico from "../data/models/IAtendimentoHasServico";

//importação do repositório para injetá-lo nos serviços
import AtendimentoHasServicoRepository from "../data/repositories/AtendimentoHasServicoRepository";

//importação dos serviços
import AddServiceToAtendimento from "../services/add/AddServiceToAtendimento";
import RemoveServiceFromAtendimento from "../services/remove/RemoveServiceFromAtendimento";
import GetAtendimentoHasServico from "../services/get/GetAtendimentoHasServico";
import GetServicosFromAtendimento from "../services/get/GetServicosFromAtendimento";
import UpdateValorTotal from "../../atendimento/services/update/UpdateValorTotal";

//cria e exporta o controller
export default class AtendimentoHasServicoCtrl
{
    //controller de adição do serviço ao atendimento
    async addServiceToAtendimento(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const servicoId: number = Number.parseInt(request.body.servicoId);
            const atendimentoId: number = Number.parseInt(request.body.atendimentoId);

            await new AddServiceToAtendimento(new AtendimentoHasServicoRepository()).execute(servicoId, atendimentoId);

            setTimeout(function()
            {
                new UpdateValorTotal().updateValorTotal(atendimentoId)
            }, 1000);

            return response.status(201).json({mensagem: "O serviço foi adicionado ao atendimento."});
        }
        catch(error: any)
        {
            return response.status(500).json({mesagem: "Não foi possível adicionar o serviço ao atendimento.", erro: error.message});
        }
    }

    async removeServiceToAtendimento(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const servicoId: number = Number.parseInt(request.body.servicoId);
            const atendimentoId: number = Number.parseInt(request.body.atendimentoId);
            
            await new RemoveServiceFromAtendimento(new AtendimentoHasServicoRepository()).execute(servicoId, atendimentoId);

            setTimeout(function()
            {
                new UpdateValorTotal().updateValorTotal(atendimentoId)
            }, 1000);
            return response.status(201).json({mensagem: "O serviço foi removido atendimento."});
        }
        catch(error: any)
        {
            return response.status(500).json({mesagem: "Não foi possível remover o serviço ao atendimento.", erro: error.message});
        }
    }

    async getAtendimentoHasServico(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const servicoId: number = Number.parseInt(request.body.servicoId);
            const atendimentoId: number = Number.parseInt(request.body.atendimentoId);

            const atendimentoHasServico = await new GetAtendimentoHasServico(new AtendimentoHasServicoRepository()).execute(servicoId, atendimentoId);

            if(!atendimentoHasServico)
            {
                return response.status(404).json({mensagem: "O Serviço selecionado não está no atendimento."});
            }

            return response.status(200).json(atendimentoHasServico);
        }
        catch(error: any)
        {
            return response.status(500).json({mesagem: "Não foi possível consultar o atendimento.", erro: error.message});
        }
    }

    async getServicosFromAtendimento(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const atendimentoId: number = Number.parseInt(request.body.atendimentoId);

            const atendimentoHasServicos: IAtendimentoHasServico[] = await new GetServicosFromAtendimento(new AtendimentoHasServicoRepository()).execute(atendimentoId);

            if(!atendimentoHasServicos)
            {
                return response.status(404).json({mensagem: "Ainda não há serviços adicionados neste atendimento."});
            }

            return response.status(200).json(atendimentoHasServicos);
        }
        catch(error: any)
        {
            return response.status(500).json({mesagem: "Não foi possível consultar o atendimento.", erro: error.message});
        }
    }
}