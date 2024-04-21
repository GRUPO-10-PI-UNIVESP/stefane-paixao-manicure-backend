import ICliente from "../../data/model/ICliente";
import IClienteRepository from "../../data/repository/IClienteRepository";

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