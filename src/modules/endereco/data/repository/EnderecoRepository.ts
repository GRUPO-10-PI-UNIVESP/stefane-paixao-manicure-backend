import IEndereco from "../entity/IEndereco";
import IEnderecoRepository from "./IEnderecoRepository";
import prisma from "../../../../shared/prisma/prismaClient";

export default class EnderecoRepository implements IEnderecoRepository
{
    async add(endereco: IEndereco): Promise<void> 
    {
        await prisma.endereco.create({data: endereco});
    }

    async update(endereco: IEndereco, enderecoId: number): Promise<void> 
    {
        await prisma.endereco.update({data: endereco, where: {enderecoId: enderecoId}});
    }

    async delete(enderecoId: number): Promise<void> 
    {
        await prisma.endereco.delete({where: {enderecoId: enderecoId}});
    }

    async findUnique(enderecoId: number): Promise<IEndereco> 
    {
        return <IEndereco> await prisma.endereco.findUnique({where: {enderecoId: enderecoId}});
    }

    async findAll(): Promise<IEndereco[]> 
    {
        return <IEndereco[]> await prisma.endereco.findMany();
    }
    
}
