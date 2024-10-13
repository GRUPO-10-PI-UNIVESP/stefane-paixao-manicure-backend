import IFilialEntity from "../data/model/IFilialEntity";
import IFilialRepository from "../data/repository/IFilialRepository";

export default class UpdateFilial
{
    private filialRepository: IFilialRepository;

    constructor(filialRepository: IFilialRepository)
    {
        this.filialRepository = filialRepository;
    }

    async execute(filial: IFilialEntity, filialId: number): Promise<void>
    {
        await this.filialRepository.update(filial, filialId);
    }
}