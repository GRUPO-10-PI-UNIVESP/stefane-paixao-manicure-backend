import IFilialRepository from "../data/repository/IFilialRepository";

export default class DeleteFilial
{
    private filialRepository: IFilialRepository;

    constructor(filialRepository: IFilialRepository)
    {
        this.filialRepository = filialRepository;
    }

    async execute(filialId: number): Promise<void>
    {
        await this.filialRepository.delete(filialId);
    }
}