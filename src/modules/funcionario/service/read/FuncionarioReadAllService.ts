import IFuncionarioRepository from "../../interface/repository/IFuncionarioRepository";
import IFuncionarioView from "../../interface/view/IFuncionarioView";
import IFuncionario from "../../model/IFuncionario";
import IFuncionarioReadServiceInput from "./IFuncionarioReadServiceInput";
import IFuncionarioReadServiceOutput from "./IFuncionarioReadServiceOutput";

export default class FuncionarioReadUniqueService implements IFuncionarioReadServiceInput
{
    private repository: IFuncionarioRepository;
    private presenter: IFuncionarioReadServiceOutput;

    constructor(repository: IFuncionarioRepository, presenter: IFuncionarioReadServiceOutput)
    {
        this.repository = repository;
        this.presenter = presenter;
    }

    async execute<T>(param?: T, options?: {[key: string | number]: any}): Promise<IFuncionarioView>
    {
        const funcionarios: IFuncionario = await this.repository.readAll();
        return await this.presenter.present(funcionarios);
    }
}