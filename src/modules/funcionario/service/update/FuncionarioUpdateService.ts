import IFuncionarioRepository from "../../interface/repository/IFuncionarioRepository";
import IFuncionarioView from "../../interface/view/IFuncionarioView";
import IFuncionario from "../../model/IFuncionario";
import IFuncionarioUpdateServiceInput from "./IFuncionarioUpdateServiceInput";
import IFuncionarioUpdateServiceOutput from "./IFuncionarioUpdateServiceOutput";

export default class FuncionarioUpdateService implements IFuncionarioUpdateServiceInput 
{
    private repository: IFuncionarioRepository;
    private presenter: IFuncionarioUpdateServiceOutput;
    
    constructor(repository: IFuncionarioRepository, presenter: IFuncionarioUpdateServiceOutput)
    {
        this.repository = repository;
        this.presenter = presenter;
    }

    async execute(funcionario: IFuncionario, id: number): Promise<IFuncionarioView> 
    {
        await this.repository.update(funcionario, id);
        return await this.presenter.present(funcionario);
    }
}