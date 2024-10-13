import IFilialEntity from "../data/model/IFilialEntity";
import IFilialRepository from "../data/repository/IFilialRepository";

export default class ReadUniqueFilial
{
    private filialRepository: IFilialRepository;

    constructor(filialRepository: IFilialRepository)
    {
        this.filialRepository = filialRepository;
    }

    async execute(filialId: number): Promise<IFilialEntity>
    {
        return await this.filialRepository.searchUnique(filialId);
    }
}