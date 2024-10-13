import IEndereco from "../data/entity/IEndereco";
import IEnderecoRepository from "../data/repository/IEnderecoRepository";

export default class CreateEndereco
{
    private enderecoRepository;

    constructor(enderecoRepository: IEnderecoRepository)
    {
        this.enderecoRepository = enderecoRepository;
    }

    async execute(endereco: IEndereco): Promise<void>
    {
        await this.enderecoRepository.add(endereco);
    }
}