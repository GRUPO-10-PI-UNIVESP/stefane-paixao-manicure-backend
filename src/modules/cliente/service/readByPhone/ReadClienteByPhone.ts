import ICliente from "../../data/model/ICliente";
import IClienteRepository from "../../data/repository/IClienteRepository";

export default class ReadClienteByPhone
{
    private clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository)
    {
        this.clienteRepository = clienteRepository;
    }

    async execute(phone: string): Promise<ICliente>
    {
        return await this.clienteRepository.readClienteByTelefone(phone);
    }
}