import IFilialEntity from "../data/model/IFilialEntity";
import IFilialRepository from "../data/repository/IFilialRepository";

export default class CreateFilial
{
    private filialRepository: IFilialRepository;

    constructor(filialRepository: IFilialRepository)
    {
        this.filialRepository = filialRepository;
    }

    async execute(filial: IFilialEntity): Promise<void>
    {
        await this.filialRepository.add(filial);
    }
}