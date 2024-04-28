//import do Request e Response para as operações HTTP da API
import {Request, Response} from "express";
import IServico from "../data/models/IServico";
import CreateServico from "../services/create/CreateServico";
import UpdateServico from "../services/update/UpdateServico";
import DeleteServico from "../services/delete/DeleteServico";

//importação do repository
import ServicoRepository from "../data/repositories/ServicoRepository";
import GetUniqueServico from "../services/read/GetUniqueServico";
import GetAllServicos from "../services/read/GetAllServicos";

//cria e exporta a classe controller
export default class ServicoController
{
    //controller de criação do serviço
    async create(request: Request, response: Response): Promise<Response>
    {
        //try para a tratativa de execução do código
        try
        {
            //aloca à constante os dados de servico do body
            const servico: IServico = request.body;

            //passa ao service o serviço a ser adicionado
            await new CreateServico(new ServicoRepository()).execute(servico);

            //retorno afirmativo da API
            return response.status(201).json({mensagem: "O serviço foi adicionado.", servico});
        }
        //catch para tratar possíveis erros
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "O serviço não foi adicionado.", erro: error.message});
        }
    }

    //controller de atualização
    async update(request: Request, response: Response): Promise<Response>
    {
        //try para a tratativa de execução do código
        try
        {
            //aloca à constante os dados de servico do body
            const servico: IServico = request.body;

            //salva o id na constante do serviço a ser atualizado
            const servicoId: number = Number.parseInt(request.params.servicoId);

            //passa so service o servico a ser atualizado identificando-o pelo seu id
            await new UpdateServico(new ServicoRepository()).execute(servico, servicoId);

            //retorno afirmativo da API
            return response.status(200).json({mensagem: "O serviço foi atualizado.", servico});
        }
        //catch para tratar possíveis erros
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "O serviço não foi atualizado.", erro: error.message});
        }
    }

    //controller de deleção
    async delete(request: Request, response: Response): Promise<Response>
    {
        //try para a tratativa de execução do código
        try
        {
            //salva o id na constante do serviço a ser atualizado
            const servicoId: number = Number.parseInt(request.params.servicoId);
 
            //envia ao service o id do servico a ser removido
            await new DeleteServico(new ServicoRepository()).execute(servicoId);
 
            //retorno afirmativo da API
            return response.status(200).json({mensagem: "O serviço foi removido."});
        }
        //catch para tratar possíveis erros
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "O serviço não foi removido.", erro: error.message});
        }
    }

    //controller de busca
     async getUnique(request: Request, response: Response): Promise<Response>
    {
        //try para a tratativa de execução do código
        try
        {
            //salva o id na constante do serviço a ser atualizado
            const servicoId: number = Number.parseInt(request.params.servicoId);

            //envia ao service o id do servico a ser removido
            const servico: IServico = await new GetUniqueServico(new ServicoRepository()).execute(servicoId);

            if(!servico)
            {
                //retorno 404 da API
                return response.status(404).json({mensagem: "O serviço não foi encontrado."});
            }

            //retorno afirmativo da API
            return response.status(200).json(servico);
        }
        //catch para tratar possíveis erros
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "O serviço não foi encontrado.", erro: error.message});
        }
    }

    //controller de busca
    async getAll(request: Request, response: Response): Promise<Response>
    {
        //try para a tratativa de execução do código
        try
        {
            //salva o id na constante do serviço a ser atualizado
            const servicoId: number = Number.parseInt(request.params.servicoId);

            //envia ao service o id do servico a ser removido
            const servicos: IServico[] = await new GetAllServicos(new ServicoRepository()).execute();

            if(!servicos)
            {
                //retorno 404 da API
                return response.status(404).json({mensagem: "Não há serviços no sistema."});
            }

            //retorno afirmativo da API
            return response.status(200).json(servicos);
        }
        //catch para tratar possíveis erros
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "O serviço não foi encontrado.", erro: error.message});
        }
    }
}
