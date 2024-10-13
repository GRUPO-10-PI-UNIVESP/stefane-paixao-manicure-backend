//import Request e Response para manipular as requisições e respostas HTTP
import {Request, Response} from "express";

//IAtendimento para tipar os objetos de tipo Atendimento
import IAtendimento from "../data/models/IAtendimento";

//IAtendimentoRepository para inverter o controle de dependência
import AtendimentoRepository from "../data/repositories/AtendimentoRepository";

//importação dos services
import CreateAtendimento from "../services/create/CreateAtendimento";
import UpdateAtendimento from "../services/update/UpdateAtendimento";
import DeleteAtendimento from "../services/delete/DeleteAtendimento";
import readUniqueAtendimento from "../services/read/readUniqueAtendimento";
import readAllAtendimentos from "../services/read/readAllAtendimentos";
import CreateAgenda from "../../agenda/services/create/CreateAgenda";
import AgendaRepository from "../../agenda/data/repositories/AgendaRepository";
import IAgenda from "../../agenda/data/models/IAgenda";
import ReadAgendasAvailable from "../../agenda/services/read/ReadAgenda";
import ReadAgenda from "../../agenda/services/read/ReadAgenda";
import AtendimentoHasServicoCtrl from "../../atendimentoHasServico/controller/AtendimentoHasServicoCtrl";
import AtendimentoHasServicoRepository from "../../atendimentoHasServico/data/repositories/AtendimentoHasServicoRepository";
import AddServiceToAtendimento from "../../atendimentoHasServico/services/add/AddServiceToAtendimento";
import UpdateValorTotal from "../services/update/UpdateValorTotal";
import UpdateAgenda from "../../agenda/services/update/UpdateAgenda";
import RemoveServiceFromAtendimento from "../../atendimentoHasServico/services/remove/RemoveServiceFromAtendimento";
import IServico from "../../servico/data/models/IServico";
import GetServicosFromAtendimento from "../../atendimentoHasServico/services/get/GetServicosFromAtendimento";

//cria e exporta a classe controller de Atendimento
export default class AtendimentoController
{
    //controller para a criação do atendimento
    async create(request: Request, response: Response): Promise<Response>
    {
        //try para testar a execução do código
        try
        {
            //guarda na constante as infos de atendimento vindas do body
            let atendimento: IAtendimento = request.body;
            let servicoId: number = Number.parseInt(request.body.servicoId);
            //criando o agenda pelos dados inseridos do body
            const agenda: IAgenda = 
            {
                dataHoraInicial: request.body.dataHoraInicial, dataHoraFinal: request.body.dataHoraFinal,
                agendaId: 0
            };
  
            //inclui a nova agenda
            const agendaInserida = await new CreateAgenda(new AgendaRepository()).execute(agenda);
            
            //adicionando o id da agenda inserida ao agendaId do atendimento
            atendimento.agendaId = agendaInserida.agendaId;
            
            //passa ao serviço o atendimento a ser inserido no sistema
            const atendimentoInserido: IAtendimento = await new CreateAtendimento(new AtendimentoRepository()).execute(atendimento);
            console.log(atendimentoInserido)

            setTimeout(function()
            {
                new AddServiceToAtendimento(new AtendimentoHasServicoRepository()).execute(servicoId, atendimentoInserido.atendimentoId);
            }, 1000);
            
            setTimeout(function()
            {
                new UpdateValorTotal().updateValorTotal(atendimentoInserido.atendimentoId)
            }, 2000);

            

            //resposta afirmativa da API
            return response.status(201).json({mensagem: "Atendimento cadastrado com sucesso.", atendimento});
        }
        //catch para tratar erros
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível cadastrar o atendimento.", erro: error.message});
        }
    }

    //controller para a atualização do atendimento
    async update(request: Request, response: Response): Promise<Response>
    {
        //try para testar a execução do código
        try
        {
           
             let servicoId: number = Number.parseInt(request.body.servicoId);
             let atendimentoId: number = Number.parseInt(request.params.atendimentoId);
             let agendaId: number = Number.parseInt(request.body.agendaId);
             //criando o agenda pelos dados inseridos do body
             const agenda: IAgenda = 
             {
                 dataHoraInicial: request.body.dataHoraInicial, 
                 dataHoraFinal: request.body.dataHoraFinal,
                 agendaId: Number.parseInt(request.body.agendaId)
             };

             const atendimento: IAtendimento = request.body;
   
             //inclui a nova agenda
             await new UpdateAgenda(new AgendaRepository()).execute(agenda, agendaId);
             
             
             //passa ao serviço o atendimento a ser inserido no sistema
             await new UpdateAtendimento(new AtendimentoRepository()).execute(atendimento, atendimentoId);
             
             const servicoOld: any = await new GetServicosFromAtendimento(new AtendimentoHasServicoRepository()).execute(atendimentoId);

             setTimeout(function()
             {
                 new RemoveServiceFromAtendimento(new AtendimentoHasServicoRepository()).execute(servicoOld.servicoId, atendimentoId);
                 new AddServiceToAtendimento(new AtendimentoHasServicoRepository()).execute(servicoId, atendimentoId);
             }, 1000);
             
             setTimeout(function()
             {
                 new UpdateValorTotal().updateValorTotal(atendimentoId)
             }, 2000);
 

            //resposta afirmativa da API
            return response.status(200).json({mensagem: "Atendimento atualizado com sucesso.", atendimento});
        }
        //catch para tratar erros
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível atualizar o atendimento.", erro: error.message});
        }
    }

    //controller para a deleção do atendimento
    async delete(request: Request, response: Response): Promise<Response>
    {
        //try para testar a execução do código
        try
        {
            //salva na constante o atendimento
            const atendimentoId: number = Number.parseInt(request.params.atendimentoId);

            //passa ao serviço o id do atendimento a ser removido no sistema
            await new DeleteAtendimento(new AtendimentoRepository()).execute(atendimentoId);

            //resposta afirmativa da API
            return response.status(200).json({mensagem: "Atendimento deletado com sucesso."});
        }
        //catch para tratar erros
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível deletar o atendimento.", erro: error.message});
        }
    }

    //controller para a consulta do atendimento
    async getUnique(request: Request, response: Response): Promise<Response>
    {
        //try para testar a execução do código
        try
        {
            //salva na constante o atendimento
            const atendimentoId: number = Number.parseInt(request.params.atendimentoId);

            //passa ao serviço o atendimento a ser inserido no sistema
            const atendimento: IAtendimento = await new readUniqueAtendimento(new AtendimentoRepository()).execute(atendimentoId);

            //resposta afirmativa da API
            return response.status(200).json(atendimento);
        }
        //catch para tratar erros
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível consultar o atendimento.", erro: error.message});
        }
    }

    //controller para a consulta dos atendimentos
    async getAll(request: Request, response: Response): Promise<Response>
    {
        //try para testar a execução do código
        try
        {
            //passa ao serviço o atendimento a ser inserido no sistema
            let atendimentos: IAtendimento[] = await new readAllAtendimentos(new AtendimentoRepository()).execute();

            for(let i = 0; i < atendimentos.length; i ++)
            {

                const agenda = await new ReadAgenda(new AgendaRepository()).execute(atendimentos[i].agendaId);

                const obj = 
                { 
                    data: ((agenda.dataHoraInicial.getDate() < 9 ? '0' : '') + agenda.dataHoraInicial.getDate()) + "/" + 
                    ((agenda.dataHoraInicial.getMonth() < 9 ? '0' : '') + (agenda.dataHoraInicial.getMonth() + 1)) + "/" + 
                    agenda.dataHoraFinal.getFullYear(),
                    horaInicial: (agenda.dataHoraInicial.getHours() + 3) + ":" + ((agenda.dataHoraInicial.getMinutes() < 9 ? '0' : '') + agenda.dataHoraInicial.getMinutes()),
                    horaFinal: (agenda.dataHoraFinal.getHours() + 3)  + ":" + ((agenda.dataHoraFinal.getMinutes() < 9 ? '0' : '') + agenda.dataHoraFinal.getMinutes())
                }
                atendimentos[i].dataFormatada = obj;
            }
      
            //resposta afirmativa da API
            return response.status(200).json(atendimentos);
        }
        //catch para tratar erros
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível consultar os atendimentos.", erro: error.message});
        }
    }
}