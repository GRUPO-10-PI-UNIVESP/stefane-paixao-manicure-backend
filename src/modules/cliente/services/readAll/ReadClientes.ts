import ICliente from "../../data/models/ICliente";
import IClienteRepository from "../../data/repositories/IClienteRepository";

export default class ReadClienteAll
{
    private clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository)
    {
        this.clienteRepository = clienteRepository;
    }

    async execute(): Promise<ICliente[]>
    {
        return await this.clienteRepository.readClientes();
    }
}