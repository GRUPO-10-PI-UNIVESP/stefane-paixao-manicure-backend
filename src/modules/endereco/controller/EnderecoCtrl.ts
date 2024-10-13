import {Request, Response} from "express";
import IEnderecoRepository from "../data/repository/IEnderecoRepository";
import IEnderecoEntity from "../data/entity/IEndereco";
import EnderecoRepository from "../data/repository/EnderecoRepository";
import CreateEndereco from "../services/CreateEndereco";
import UpdateEndereco from "../services/UpdateEndereco";
import DeleteEndereco from "../services/DeleteEndereco";
import ReadUniqueEndereco from "../services/FindUniqueEndereco";
import ReadAllEndereco from "../services/FindAllEnderecos";

export default class EnderecoCtrl
{
    async add(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const repository: IEnderecoRepository = new EnderecoRepository();
            const service = new CreateEndereco(repository);
            const Endereco: IEnderecoEntity = request.body;

            await service.execute(Endereco)

            return response.status(201).json({mensagem: "O endereco foi inserida com sucesso."});
        }
        catch(error: any)
        {
            return response.status(500).json({mensagem: "Não foi possível inserir o endereco", erro: error.message});
        }
    }

    async update(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const repository: IEnderecoRepository = new EnderecoRepository();
            const service = new UpdateEndereco(repository);
            const Endereco: IEnderecoEntity = request.body;
            const id: number = Number.parseInt(request.params.enderecoId);

            await service.execute(Endereco, id);

            return response.status(200).json({mensagem: "O endereco foi atualizada com sucesso."});
        }
        catch(error: any)
        {
            return response.status(500).json({mensagem: "Não foi possível atualizar o endereco", erro: error.message});
        }
    }

    async delete(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const repository: IEnderecoRepository = new EnderecoRepository();
            const service = new DeleteEndereco(repository);
            const id: number = Number.parseInt(request.params.enderecoId);

            await service.execute(id);

            return response.status(200).json({mensagem: "O Endereco foi deletada com sucesso."});
        }
        catch(error: any)
        {
            return response.status(500).json({mensagem: "Não foi possível deletar o endereco", erro: error.message});
        }
    }

    async findUnique(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const repository: IEnderecoRepository = new EnderecoRepository();
            const service = new ReadUniqueEndereco(repository);
            const id: number = Number.parseInt(request.params.enderecoId);

            const endereco: IEnderecoEntity = await service.execute(id);

            if(!endereco)
            {
                return response.status(404).json({mensagem: "O endereço não foi encontrado."})
            }

            return response.status(200).json({mensagem: "O Endereco foi encontrado com sucesso.", endereco});
        }
        catch(error: any)
        {
            return response.status(500).json({mensagem: "Não foi possível buscar o endereco", erro: error.message});
        }
    }

    async findAll(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const repository: IEnderecoRepository = new EnderecoRepository();
            const service = new ReadAllEndereco(repository);

            const enderecos: IEnderecoEntity[] = await service.execute();

            if(!enderecos)
            {
                return response.status(404).json({mensagem: "Não há endereços para listar."})
            }

            return response.status(200).json({mensagem: "Listagem de todos os endereços cadastrados.", enderecos});
        }
        catch(error: any)
        {
            return response.status(500).json({mensagem: "Não foi possível listar os endereços.", erro: error.message});
        }
    }
}