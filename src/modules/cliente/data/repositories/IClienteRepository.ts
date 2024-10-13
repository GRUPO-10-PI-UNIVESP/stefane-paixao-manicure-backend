import ICliente from "../models/ICliente";

export default interface IClienteRepository
{
    createCliente(cliente: ICliente): Promise<void>;
    updateCliente(cliente: ICliente, clienteId: number): Promise<void>;
    deleteCliente(clienteId: number): Promise<void>;
    readClienteByName(nome: string): Promise<ICliente[]>;
    readClienteByTelefone(telefone: string): Promise<ICliente>;
    readClientes(): Promise<ICliente[]>;
}