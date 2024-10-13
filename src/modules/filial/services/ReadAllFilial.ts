import IFilialEntity from "../data/model/IFilialEntity";
import IFilialRepository from "../data/repository/IFilialRepository";

export default class ReadAllFilial
{
    private filialRepository: IFilialRepository;

    constructor(filialRepository: IFilialRepository)
    {
        this.filialRepository = filialRepository;
    }

    async execute(): Promise<IFilialEntity[]>
    {
        return await this.filialRepository.searchAll();
    }
}