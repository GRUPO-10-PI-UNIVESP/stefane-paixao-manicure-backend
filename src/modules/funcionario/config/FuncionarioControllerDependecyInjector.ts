import FuncionarioController from "../interface/controller/FuncionarioController";
import FuncionarioServiceDependencyInjector from "./FuncionarioServiceDependencyInjector";

export default class FuncionarioControllerDependencyInjector 
{
    async injectIntoCreate(httpBody: any)
    {
        const service = await new FuncionarioServiceDependencyInjector().injectIntoCreate();
        return new FuncionarioController().funcionarioCreate(service, httpBody);
    }

    async injectIntoUpdate(httpBody: any, paramFuncionarioId: number)
    {
        const service = await new FuncionarioServiceDependencyInjector().injectIntoUpdate();
        return new FuncionarioController().funcionarioUpdate(service, httpBody, paramFuncionarioId);
    }

    async injectIntoDelete(paramFuncionarioId: number)
    {
        const service = new FuncionarioServiceDependencyInjector().injectIntoDelete();
        return new FuncionarioController().funcionarioDelete(await service, paramFuncionarioId);
    }

    async injectIntoReadUnique(paramFuncionarioId: number)
    {   
        const service = await new FuncionarioServiceDependencyInjector().injectIntoReadUnique();
        return new FuncionarioController().funcionarioReadUnique(service, paramFuncionarioId);
    }

    async injectIntoReadUniqueByName(paramFuncionarioNome: string)
    {
        const service = await new FuncionarioServiceDependencyInjector().injectIntoReadUniqueByName();
        return new FuncionarioController().funcionarioReadUniqueByName(service, paramFuncionarioNome);
    }

    async injectIntoReadAll()
    {
        const service = await new FuncionarioServiceDependencyInjector().injectIntoReadAll()
        return new FuncionarioController().funcionarioReadAll(service);
    }
}