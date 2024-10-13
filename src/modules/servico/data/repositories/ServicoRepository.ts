//importa a interface para tipar serviço
import IServico from "../models/IServico";

//importa a interface para implementar os métodos de IServicoRepository
import IServicoRepository from "./IServicoRepository";

//importação do ORM prisma para atuar com o banco
import prisma from "../../../../shared/prisma/prismaClient";

//exporta e cria a classe de implementação de IServicoRepository
export default class ServicoRepository implements IServicoRepository
{
    //método para criar o objeto servico no banco
    async create(servico: IServico): Promise<void> 
    {
        await prisma.servico.create({data: servico});
    }

    //método para atualizar o objeto servico no banco
    async update(servico: IServico, servicoId: number): Promise<void> 
    {
        await prisma.servico.update({data: servico, where: {servicoId: servicoId}});
    }

    //método para deletar o objeto servico no banco
    async delete(servicoId: number): Promise<void> 
    {
        await prisma.servico.delete({where: {servicoId: servicoId}});
    }

    //método para obter um objeto servico no banco
    async getUnique(servicoId: number): Promise<IServico> 
    {
        return <IServico> <unknown> await prisma.servico.findUnique({where: {servicoId: servicoId}});
    }

    //método para consultar todos os serviços no banco
    async getAll(): Promise<IServico[]> 
    {
        return <IServico[]> <unknown> await prisma.servico.findMany();
    }
    
}