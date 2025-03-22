import {Request, Response} from "express";
import FuncionarioControllerDependencyInjector from "../../config/FuncionarioControllerDependecyInjector";

export default class FuncionarioRouterExpressImpl
{
    async funcionarioCreateRouterExpress(request: Request, response: Response): Promise<Response>
    {
        const {code, message, error, funcionario} = await new FuncionarioControllerDependencyInjector().injectIntoCreate(request.body);

        return response.status(code).json({message, result: error ? error : funcionario});
    }

    async funcionarioUpdateRouterExpress(request: Request, response: Response): Promise<Response>
    {
        const {code, message, error, funcionario} = await new FuncionarioControllerDependencyInjector().injectIntoUpdate(request.body, Number.parseInt(request.params.funcionarioId));

        return response.status(code).json({message, result: error ? error : funcionario});
    }

    async funcionarioDeleteRouterExpress(request: Request, response: Response)
    {
        const {code, message, error, funcionario} = await new FuncionarioControllerDependencyInjector().injectIntoDelete(Number.parseInt(request.params.funcionarioId)); 

        return response.status(code).json({message, result: error ? funcionario : funcionario});
    }

    async funcionarioFindUniqueRouterExpress(request: Request, response: Response)
    {
        const {code, message, error, funcionario} = await new FuncionarioControllerDependencyInjector().injectIntoReadUnique(Number.parseInt(request.params.funcionarioId));

        return response.status(code).json({message, result: error ? error : funcionario});
    }

    async funcionarioFindUniqueByNameRouterExpress(request: Request, response: Response)
    {
        const {code, message, error, funcionario} = await new FuncionarioControllerDependencyInjector().injectIntoReadUniqueByName(request.params.funcionarioNome);

        return response.status(code).json({message, result: error ? error : funcionario})
    }

    async funcionarioReadAllRouterExpress(request: Request, response: Response)
    {
        const {code, message, error, funcionarios} = await new FuncionarioControllerDependencyInjector().injectIntoReadAll();
        
        return response.status(code).json({message, result: error ? error : funcionarios});
    }
}