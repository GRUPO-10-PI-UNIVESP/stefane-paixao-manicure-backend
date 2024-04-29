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
            const atendimento: IAtendimento = request.body;

            //passa ao serviço o atendimento a ser inserido no sistema
            await new CreateAtendimento(new AtendimentoRepository()).execute(atendimento);

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
            //guarda na constante as infos de atendimento vindas do body
            const atendimento: IAtendimento = request.body;

            //salva na constante o atendimento
            const atendimentoId: number = Number.parseInt(request.params.atendimentoId);

            //passa ao serviço o atendimento a ser atualizado e seu respectivo id no sistema
            await new UpdateAtendimento(new AtendimentoRepository()).execute(atendimento, atendimentoId);

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
            const atendimentos: IAtendimento[] = await new readAllAtendimentos(new AtendimentoRepository()).execute();
 
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