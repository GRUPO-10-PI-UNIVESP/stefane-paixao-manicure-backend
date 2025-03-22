import IFuncionarioRepository from "../../interface/repository/IFuncionarioRepository";
import IFuncionarioView from "../../interface/view/IFuncionarioView";
import Funcionario from "../../model/Funcionario";
import IFuncionarioCreateServiceInput from "./IFuncionarioCreateServiceInput";
import IFuncionarioCreateServiceOutput from "./IFuncionarioCreateServiceOutput";

export default class FuncionarioCreateService implements IFuncionarioCreateServiceInput
{
    private repository: IFuncionarioRepository;
    private presenter: IFuncionarioCreateServiceOutput;

    constructor(repository: IFuncionarioRepository, presenter: IFuncionarioCreateServiceOutput)
    {
        this.repository = repository;
        this.presenter = presenter;
    }

    async execute(funcionario: Funcionario): Promise<IFuncionarioView> 
    {
        await this.repository.create(funcionario);
        return await this.presenter.present(funcionario);
    }
}