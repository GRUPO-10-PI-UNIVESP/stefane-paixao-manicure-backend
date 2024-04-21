import ICliente from "../../data/model/ICliente";
import IClienteRepository from "../../data/repository/IClienteRepository";

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