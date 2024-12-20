import IClienteRepository from "../../data/repositories/IClienteRepository";

export default class DeleteCliente
{
    private clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository)
    {
        this.clienteRepository = clienteRepository;
    }

    async execute(clienteId: number): Promise<void>
    {
        await this.clienteRepository.deleteCliente(clienteId);
    }
}
