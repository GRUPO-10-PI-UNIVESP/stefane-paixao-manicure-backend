import IFuncionarioRepository from "../../interface/repository/IFuncionarioRepository";
import IFuncionarioView from "../../interface/view/IFuncionarioView";
import IFuncionario from "../../model/IFuncionario";
import IFuncionarioDeleteServiceInput from "./IFuncionarioDeleteServiceInput";
import IFuncionarioDeleteServiceOutput from "./IFuncionarioDeleteServiceOutput";

export default class FuncionarioDeleteService implements IFuncionarioDeleteServiceInput
{
    private repository: IFuncionarioRepository;
    private presenter: IFuncionarioDeleteServiceOutput;

    constructor(repository: IFuncionarioRepository, presenter: IFuncionarioDeleteServiceOutput)
    {
        this.repository = repository;
        this.presenter = presenter;
    }

    async execute(id: number): Promise<void> 
    {
        await this.repository.delete(id);
    }
}