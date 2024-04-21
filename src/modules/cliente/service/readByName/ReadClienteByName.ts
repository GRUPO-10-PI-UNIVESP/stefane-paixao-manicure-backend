import ICliente from "../../data/model/ICliente";
import IClienteRepository from "../../data/repository/IClienteRepository";

export default class ReadClienteByName
{
    private clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository)
    {
        this.clienteRepository = clienteRepository;
    }

    async execute(name: string): Promise<ICliente[]>
    {
        return this.clienteRepository.readClienteByName(name);
    }
}