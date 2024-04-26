//request e response para operações HTTP
import {Request, Response} from "express";

import ICliente from "../data/models/ICliente";
import CreateCliente from "../services/create/CreateCliente";
import ClienteRepository from "../data/repositories/ClienteRepository";
import UpdateCliente from "../services/update/UpdateCliente";
import DeleteCliente from "../services/delete/DeleteCliente";
import ReadClienteByName from "../services/readByName/ReadClienteByName";
import ReadClienteByPhone from "../services/readByPhone/ReadClienteByPhone";
import ReadClientes from "../services/readAll/ReadClientes";

//cria e exporta a classe
export default class ClienteController
{
    //mediator de criação
    async create(request: Request, response: Response): Promise<Response>
    {
        //bloco try para tratativa de execução
        try
        {
            //obtém os dados do request sobre o cliente
            const cliente: ICliente = request.body;

            //invoca o serviço
            await new CreateCliente(new ClienteRepository()).execute(cliente);

            //resposta de sucesso da API
            return response.status(201).json({mensagem: "Cliente adicionado.", cliente});
        }

        //bloco catch para tratativa de erro
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "O cliente não foi adicionado", error: error.message});
        }
    }

    async update(request: Request, response: Response): Promise<Response>
    {
        //bloco try para tratativa de execução
        try
        {
            //obtém os dados do request sobre o cliente
            const cliente: ICliente = request.body;

            //obtém pela url o clienteId
            const clienteId: number = Number.parseInt(request.params.clienteId);

            //invoca o serviço
            new UpdateCliente(new ClienteRepository()).execute(cliente, clienteId);

            //resposta de sucesso da API
            return response.status(200).json({mensagem: "Cliente atualizado.", cliente});
        }

        //bloco catch para tratativa de erro
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível atualizar o cliente.", error: error.message});
        }
    }

    async delete(request: Request, response: Response): Promise<Response>
    {
        //bloco try para tratativa de execução
        try
        {
            //obtém pela url o clienteId
            const clienteId: number = Number.parseInt(request.params.clienteId);

            //invoca o serviço
            new DeleteCliente(new ClienteRepository()).execute(clienteId);

            //resposta afirmativa da API
            return response.status(200).json({mensagem: "Cliente deletado."});
        }

        //bloco catch para tratativa de erro
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "O cliente não foi deletado.", error: error.message});
        }
    }

    async readByName(request: Request, response: Response): Promise<Response>
    {
        //bloco try para tratativa de execução
        try
        {
            //obtém pela url o nome do cliente
            const name: string = (request.params.name);

            //invoca o serviço
            const clientes: ICliente[] = await new ReadClienteByName(new ClienteRepository()).execute(name);

            if(!clientes)
            {
                //resposta da API de não encontrado
                return response.status(404).json({mensagem: "Não há clientes com o nome pesquisado."});
            }

            //retorno da API com os nomes encontrados
            return response.status(200).json(clientes);
        }

        //bloco catch para tratativa de erro
        catch(error: any)
        {
            //retorno de erro da API
            return response.status(500).json({mensagem: "O cliente não foi pesquisado", error: error.message});
        }
    }

    async readByPhone(request: Request, response: Response): Promise<Response>
    {
        //bloco try para tratativa de execução
        try
        {
            //obtém pela url o nome do cliente
            const phone: string = (request.params.phone);

            //invoca o serviço
            const cliente: ICliente = await new ReadClienteByPhone(new ClienteRepository()).execute(phone);

            if(!cliente)
            {
                //resposta da API de não encontrado
                return response.status(404).json({mensagem: "Não há cliente cadastrado com o telefone informado."});
            }

            return response.status(200).json(cliente);
        }

        //bloco catch para tratativa de erro
        catch(error: any)
        {
            return response.status(500).json({mensagem: "O cliente não foi pesquisado", error: error.message});
        }
    }

    async readClientes(request: Request, response: Response): Promise<Response>
    {
        //bloco try para tratativa de execução
        try
        {
            //invoca o serviço
            const clientes: ICliente[] = await new ReadClientes(new ClienteRepository()).execute();

            //retorna todos os clientes no sistema
            return response.status(200).json(clientes);
        }

        //bloco catch para tratativa de erro
        catch(error: any)
        {
            //retorno negativo da   API
            return response.status(500).json({mensagem: "Os clientes não foram pesquisados.", error: error.message});
        }
    }
}