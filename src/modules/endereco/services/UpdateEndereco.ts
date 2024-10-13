import IEndereco from "../data/entity/IEndereco";
import IEnderecoRepository from "../data/repository/IEnderecoRepository";

export default class UpdateEndereco
{
    private enderecoRepository;

    constructor(enderecoRepository: IEnderecoRepository)
    {
        this.enderecoRepository = enderecoRepository;
    }

    async execute(endereco: IEndereco, enderecoId: number): Promise<void>
    {
        await this.enderecoRepository.update(endereco, enderecoId);
    }
}