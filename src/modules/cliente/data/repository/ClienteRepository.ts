import ICliente from "../model/ICliente";
import IClienteRepository from "./IClienteRepository";

//importa o prisma ORM
import prisma from "../../../../shared/prisma/prismaClient";

export default class ClienteRepository implements IClienteRepository
{
    async createCliente(cliente: ICliente): Promise<void>
    {
        await prisma.cliente.create({data: cliente});
    }

    async updateCliente(cliente: ICliente, clienteId: number): Promise<void> 
    {
        await prisma.cliente.update({data: cliente, where: {clienteId: clienteId}});
    }

    async deleteCliente(clienteId: number): Promise<void> 
    {
        await prisma.cliente.delete({where: {clienteId: clienteId}});
    }

    async readClienteByName(nome: string): Promise<ICliente[]> 
    {
        return <ICliente[]> <unknown> await prisma.cliente.findMany({where: {nomeCliente: nome}});
    }

    async readClienteByTelefone(telefone: string): Promise<ICliente>
    {
        return <ICliente> <unknown> await prisma.cliente.findUnique({where: {numeroTelefone: telefone}});
    }

    async readClientes(): Promise<ICliente[]> 
    {
        return <ICliente[]> <unknown> await prisma.cliente.findMany();
    }
    
}