import IEndereco from "../data/entity/IEndereco";
import IEnderecoRepository from "../data/repository/IEnderecoRepository";

export default class FindAllEnderecos
{
    private enderecoRepository;

    constructor(enderecoRepository: IEnderecoRepository)
    {
        this.enderecoRepository = enderecoRepository;
    }

    async execute(): Promise<IEndereco[]>
    {
        return await this.enderecoRepository.findAll();
    }
}