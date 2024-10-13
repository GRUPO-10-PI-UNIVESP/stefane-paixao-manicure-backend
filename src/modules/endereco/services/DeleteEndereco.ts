import IEnderecoRepository from "../data/repository/IEnderecoRepository";

export default class DeleteEndereco
{
    private enderecoRepository: IEnderecoRepository;

    constructor(enderecoRepository: IEnderecoRepository)
    {
        this.enderecoRepository = enderecoRepository;
    }

    async execute(enderecoId: number): Promise<void>
    {
        this.enderecoRepository.delete(enderecoId);
    }
}