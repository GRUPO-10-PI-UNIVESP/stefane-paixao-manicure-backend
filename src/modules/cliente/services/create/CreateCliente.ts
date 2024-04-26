import ICliente from "../../data/models/ICliente";
import IClienteRepository from "../../data/repositories/IClienteRepository";

export default class CreateCliente
{
    private clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository)
    {
        this.clienteRepository = clienteRepository;
    }

    async execute(cliente: ICliente): Promise<void>
    {
        this.clienteRepository.createCliente(cliente);
    }
}