import Funcionario from "../../model/Funcionario";
import FuncionarioFactory from "../../model/FuncionarioFactory";
import IFuncionarioCreateServiceInput from "../../service/create/IFuncionarioCreateServiceInput";
import IFuncionarioDeleteServiceInput from "../../service/delete/IFuncionarioDeleteServiceInput";
import IFuncionarioReadServiceInput from "../../service/read/IFuncionarioReadServiceInput";
import IFuncionarioUpdateServiceInput from "../../service/update/IFuncionarioUpdateServiceInput";

export default class FuncionarioController
{
    async funcionarioCreate(service: IFuncionarioCreateServiceInput, httpBody: any): Promise<any>
    {
        try
        {
            const funcionario: Funcionario = await service.execute(new FuncionarioFactory().getInstance(httpBody));

            return {code: 201, message: "Success", funcionario};
        }
        catch(error)
        {
            console.log(error)
            return {code: 500, message: "Failed", error};
        }
    }

    async funcionarioUpdate(service: IFuncionarioUpdateServiceInput, httpBody: any, param: number): Promise<any>
    {
        try
        {
            const funcionario = await service.execute(new FuncionarioFactory().getInstance(httpBody), param);
           
            return {code: 200, message: "Success", funcionario};
        }
        catch(error)
        {
            
            return {code: 500, message: "Failed", error};
        }
        
    }

    async funcionarioDelete(service: IFuncionarioDeleteServiceInput, param: number): Promise<any>
    {
        try
        {
            const funcionario = await service.execute(param);

            return {code: 200, message: "Success", funcionario};
        }
        catch(error)
        {
            return {code: 500, message: "Failed", error};
        }
        
    }

    async funcionarioReadUnique(service: IFuncionarioReadServiceInput, param: number): Promise<any>
    {
        try
        {
            const funcionario = await service.execute(param);
            
            return {code: 200, message: "Success", funcionario};
        }
        catch(error)
        {
            return {code: 500, message: "Failed", error};
        }
        
    }

    async funcionarioReadUniqueByName(service: IFuncionarioReadServiceInput, param: string): Promise<any>
    {
        try
        {
            const funcionario = await service.execute(param);
            
            return {code: 200, message: "Success", funcionario};
        }
        catch(error)
        {
            return {code: 500, message: "Failed", error};
        }
        
    }

    async funcionarioReadAll(service: IFuncionarioReadServiceInput): Promise<any>
    {
        try
        {
            const funcionarios = await service.execute();
          
            return {code: 200, message: "Success", funcionarios};
        }
        catch(error)
        {
            return {code: 500, message: "Success", error};
        }
    }
}