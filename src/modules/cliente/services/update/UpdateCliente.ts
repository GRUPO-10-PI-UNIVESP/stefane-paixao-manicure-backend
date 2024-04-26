import ICliente from "../../data/models/ICliente";
import IClienteRepository from "../../data/repositories/IClienteRepository";

export default class UpdateCliente
{
    private clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository)
    {
        this.clienteRepository = clienteRepository;
    }

    execute(cliente: ICliente, clienteId: number): void
    {
        this.clienteRepository.updateCliente(cliente, clienteId);
    }
}