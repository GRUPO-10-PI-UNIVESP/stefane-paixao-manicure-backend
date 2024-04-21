import ICliente from "../../data/model/ICliente";
import IClienteRepository from "../../data/repository/IClienteRepository";

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