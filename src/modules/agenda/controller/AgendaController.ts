//importando o request e response para requisições HTTP
import {Request, Response} from "express";

//importação da interface IAgenda para tipar as agendas
import IAgenda from "../data/models/IAgenda";

//repository a ser injetado nos serviços
import AgendaRepository from "../data/repositories/AgendaRepository";

//Importação dos serviços 
import CreateAgenda from "../services/create/CreateAgenda";
import UpdateAgenda from "../services/update/UpdateAgenda";
import DeleteAgenda from "../services/delete/DeleteAgenda";
import ReadAgendasAvailable from "../services/read/ReadAgenda";
import ReadAllAgendas from "../services/read/ReadAllAgendas";

//exporta e cria a classe controller de Agenda
export default class AgendaController
{
    //define o método criação do controller da Agenda
    async create(request: Request, response: Response): Promise<Response>
    {
        //bloco try para testar a execução do código
        try
        {
            //atribuindo as características da agenda
            const agenda: IAgenda = request.body;

            //injeta no serviço o repository e passsa a agenda a ser inserida
            await new CreateAgenda(new AgendaRepository()).execute(agenda);


            //retorno de sucesso da API
            return response.status(201).json({mensagem: "Agenda inserida com sucesso.", agenda});
        }
        //bloco catch para capturar alguma exceção, na execução do algoritmo, que venha ocorrer
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "Não foi possível inserir a agenda.", erro: error.message});
        }
    }

    //define o método update do controller da Agenda
    async update(request: Request, response: Response): Promise<Response>
    {
        //bloco try para testar a execução do código
        try
        {
            //atribuindo as características da agenda
            const agenda: IAgenda = request.body;

            //pegando o id da agenda para a atualização pela url
            const agendaId: number = Number.parseInt(request.params.agendaId);

            //injeta no serviço o repository e passsa a agenda a ser atualizada com seu id
            await new UpdateAgenda(new AgendaRepository()).execute(agenda, agendaId);

            const obj = 
            { 
                data: ((agenda.dataHoraInicial.getDate() < 9 ? '0' : '') + agenda.dataHoraInicial.getDate()) + "/" + 
                ((agenda.dataHoraInicial.getMonth() < 9 ? '0' : '') + agenda.dataHoraInicial.getMonth()) + "/" + 
                agenda.dataHoraFinal.getFullYear(),
                horaInicial: agenda.dataHoraInicial.getHours,
                horaFinal: agenda.dataHoraFinal.getHours  
            }

            //retorno de sucesso da API
            return response.status(200).json({mensagem: "Agenda atualizada com sucesso.", obj});
        }
        //bloco catch para capturar alguma exceção, na execução do algoritmo, que venha ocorrer
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "Não foi possível atualizar a agenda.", erro: error.message});
        }
    }

    //define o método controller da Agenda
    async delete(request: Request, response: Response): Promise<Response>
    {
        //bloco try para testar a execução do código
        try
        {
            //pegando o id da agenda para a deleção pela url
            const agendaId: number = Number.parseInt(request.params.agendaId);

            // //injeta no serviço o repository e passsa o id da agenda a ser removida
            await new DeleteAgenda(new AgendaRepository()).execute(agendaId);

            //retorno de sucesso da API
            return response.status(200).json({mensagem: "Agenda removida com sucesso."});
        }
        //bloco catch para capturar alguma exceção, na execução do algoritmo, que venha ocorrer
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "Não foi possível deletar a agenda.", erro: error.message});
        }
    }

    //define o método controller da Agenda
    async getAgendaAvailable(request: Request, response: Response): Promise<Response>
    {
        //bloco try para testar a execução do código
        try
        {
            //injeta no serviço o repository e retorna as agendas disponíveis
            // const agendas: IAgenda[] = await new ReadAgendasAvailable(new AgendaRepository()).execute(1);

            //retorno de sucesso da API
            return response.status(200).json("agendas");
        }
        //bloco catch para capturar alguma exceção, na execução do algoritmo, que venha ocorrer
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "Não foi possível consultar a agenda.", erro: error.message});
        }
    }

    //define o método controller da Agenda
    async readAllAgendas(request: Request, response: Response): Promise<Response>
    {
        //bloco try para testar a execução do código
        try
        {
            //injeta no serviço o repository e retorna todas as agendas
            const agendas: IAgenda[] = await new ReadAllAgendas(new AgendaRepository()).execute();

            //retorno de sucesso da API
            return response.status(200).json(agendas);
        }
        //bloco catch para capturar alguma exceção, na execução do algoritmo, que venha ocorrer
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "Não foi possível consultar a agenda.", erro: error.message});
        }
    }
}