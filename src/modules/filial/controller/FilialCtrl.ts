import {Request, Response} from "express";
import IFilialRepository from "../data/repository/IFilialRepository";
import IFilialEntity from "../data/model/IFilialEntity";
import FilialRepository from "../data/repository/FilialRepository";
import CreateFilial from "../services/CreateFilial";
import UpdateFilial from "../services/UpdateFilial";
import DeleteFilial from "../services/DeleteFilial";
import ReadUniqueFilial from "../services/ReadUniqueFilial";
import ReadAllFilial from "../services/ReadAllFilial";

export default class FilialCtrl
{
    async add(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const repository: IFilialRepository = new FilialRepository();
            const service = new CreateFilial(repository);
            const filial: IFilialEntity = request.body;

            await service.execute(filial)

            return response.status(201).json({mensagem: "A filial foi inserida com sucesso."});
        }
        catch(error: any)
        {
            return response.status(500).json({mensagem: "Não foi possível inserir a filial", erro: error.message});
        }
    }

    async update(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const repository: IFilialRepository = new FilialRepository();
            const service = new UpdateFilial(repository);
            const filial: IFilialEntity = request.body;
            const id: number = Number.parseInt(request.params.filialId);

            await service.execute(filial, id);

            return response.status(200).json({mensagem: "A filial foi atualizada com sucesso."});
        }
        catch(error: any)
        {
            return response.status(500).json({mensagem: "Não foi possível atualizar a filial", erro: error.message});
        }
    }

    async delete(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const repository: IFilialRepository = new FilialRepository();
            const service = new DeleteFilial(repository);
            const id: number = Number.parseInt(request.params.filialId);

            await service.execute(id);

            return response.status(200).json({mensagem: "A filial foi deletada com sucesso."});
        }
        catch(error: any)
        {
            return response.status(500).json({mensagem: "Não foi possível deletar a filial", erro: error.message});
        }
    }

    async findUnique(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const repository: IFilialRepository = new FilialRepository();
            const service = new ReadUniqueFilial(repository);
            const id: number = Number.parseInt(request.params.filialId);

            const filial: IFilialEntity = await service.execute(id);

            if(!filial)
            {
                return response.status(404).json({mensagem: "A filial não foi encontrada."});
            }

            return response.status(200).json({mensagem: "A filial foi encontrada com sucesso.", filial});
        }
        catch(error: any)
        {
            return response.status(500).json({mensagem: "Não foi possível buscar a filial", erro: error.message});
        }
    }

    async findAll(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const repository: IFilialRepository = new FilialRepository();
            const service = new ReadAllFilial(repository);

            const filiais: IFilialEntity[] = await service.execute();

            if(!filiais)
            {
                return response.status(404).json({mensagem: "Não há filiais para listar."})
            }

            return response.status(200).json({mensagem: "Listagem de todas as filiais.", filiais});
        }
        catch(error: any)
        {
            return response.status(500).json({mensagem: "Não foi possível listar as filiais.", erro: error.message});
        }
    }
}