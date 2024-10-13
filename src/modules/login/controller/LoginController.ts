//import de request e de response para as operações http da API
import {Request, Response} from "express";

//importa a interface de login para a tipagem
import ILogin from "../data/models/ILogin";

//importação dos serviços a serem consumidos
import CreateLogin from "../services/create/CreateLogin";
import UpdateLogin from "../services/update/UpdateLogin";
import DeleteLogin from "../services/delete/DeleteLogin";
import GetUniqueLogin from "../services/read/GetUniqueLogin";
import getLogins from "../services/read/GetLogins";
import validarCredenciais from "../services/create/ValidateCredenciais";

//importação do repositório para injetá-lo nos serviços
import LoginRepository from "../data/repositories/LoginRepository";



//exporta e cria a classe controller 
export default class LoginController
{
    //controller da criação de login
    async create(request: Request, response: Response): Promise<Response>
    {
        //try para tentar a execução do código
        try
        {
            //atribuindo o body à constante login
            const login: ILogin = request.body;

            //cria o serviço injetando-lhe o repositório de persistência e passando-lhe o login a ser criado
            await new CreateLogin(new LoginRepository()).execute(login);

            //retorno afirmativo da API
            return response.status(201).json({mensagem: "O login foi criado com sucesso.", login});
        }
        //catch para tratar capturar erros
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "Não foi possível criar o login. Por favor, contate o administrador do sistema.", erro: error.message})
        }
    }

    //controller da atualização de login
    async update(request: Request, response: Response): Promise<Response>
    {
        //try para tentar a execução do código
        try
        {
            //atribuindo o body à constante login
            const login: ILogin = request.body;

            //atribuindo à constante o id recebido da url
            const loginId: number = Number.parseInt(request.params.loginId);

            //cria o serviço injetando-lhe o repositório de persistência e passando-lhe o login a ser atualizado junto de seu id
            await new UpdateLogin(new LoginRepository()).execute(login, loginId);

            //retorno afirmativo da API
            return response.status(200).json({mensagem: "O login foi atualizado com sucesso.", login});
        }
        //catch para tratar capturar erros
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "Não foi possível atualizar o login. Por favor, contate o administrador do sistema.", erro: error.message})
        }
    }

    //controller da deleção de login
    async delete(request: Request, response: Response): Promise<Response>
    {
        //try para tentar a execução do código
        try
        {
            //atribuindo à constante o id recebido da url
            const loginId: number = Number.parseInt(request.params.loginId);

            //cria o serviço injetando-lhe o repositório de persistência e passando-lhe o id do login a ser removido
            await new DeleteLogin(new LoginRepository()).execute(loginId);

            //retorno afirmativo da API
            return response.status(200).json({mensagem: "O login foi deletado com sucesso."});
        }
        //catch para tratar capturar erros
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "Não foi possível deletar o login. Por favor, contate o administrador do sistema.", erro: error.message})
        }
    }

    //controller da consulta única de login
    async getUnique(request: Request, response: Response): Promise<Response>
    {
        //try para tentar a execução do código
        try
        {
            //atribuindo à constante o id recebido da url
            const loginId: number = Number.parseInt(request.params.loginId);

            //cria o serviço injetando-lhe o repositório de persistência e passando-lhe o id do login a ser consultado
            const login: ILogin = await new GetUniqueLogin(new LoginRepository()).execute(loginId);

            if(!login)
            {
                return response.status(404).json({mensagem: "O login não existe."});
            }

            //retorno afirmativo da API
            return response.status(200).json(login);
        }
        //catch para tratar capturar erros
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "Não foi possível consultar o login. Por favor, contate o administrador do sistema.", erro: error.message})
        }
    }

    //controller da consulta de logins
    async getAll(request: Request, response: Response): Promise<Response>
    {
        //try para tentar a execução do código
        try
        {
            //cria o serviço injetando-lhe o repositório de persistência e passando-lhe o id do login a ser consultado
            const logins: ILogin[] = await new getLogins(new LoginRepository()).execute();

            if(!logins)
            {
                return response.status(404).json({mensagem: "Não há logins cadastrados."});
            }

            //retorno afirmativo da API
            return response.status(200).json(logins);
        }
        //catch para tratar capturar erros
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "Não foi possível consultar os logins. Por favor, contate o administrador do sistema.", erro: error.message})
        }
    }

    //controller da consulta de logins
    async validateLogin(request: Request, response: Response): Promise<Response>
    {
        //try para tentar a execução do código
        try
        {
            //obtendo o usuário
            const usuario: string = request.body.usuario;
            const senha: string = request.body.senha;

            //cria o serviço injetando-lhe o repositório de persistência e passando-lhe o usuário e senha para validar o login
            const login: ILogin = await new validarCredenciais(new LoginRepository()).execute(usuario, senha);

            if(!login)
            {
                return response.status(401).json({mensagem: "Não autorizado. Por favor, verifique as credenciais."});
            }

            //retorno afirmativo da API
            return response.status(200).json({mensagem: "O usuário logou.", login});
        }
        //catch para tratar capturar erros
        catch(error: any)
        {
            //retorno negativo da API
            return response.status(500).json({mensagem: "Não foi possível consultar os logins. Por favor, contate o administrador do sistema.", erro: error.message})
        }
    }
}