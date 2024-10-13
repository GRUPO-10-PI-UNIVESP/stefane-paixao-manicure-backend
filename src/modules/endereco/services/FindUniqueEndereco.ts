import IEndereco from "../data/entity/IEndereco";
import IEnderecoRepository from "../data/repository/IEnderecoRepository";

export default class FindUniqueEndereco
{
    private enderecoRepository;

    constructor(enderecoRepository: IEnderecoRepository)
    {
        this.enderecoRepository = enderecoRepository;
    }

    async execute(enderecoId: number): Promise<IEndereco>
    {
        return this.enderecoRepository.findUnique(enderecoId);
    }
}