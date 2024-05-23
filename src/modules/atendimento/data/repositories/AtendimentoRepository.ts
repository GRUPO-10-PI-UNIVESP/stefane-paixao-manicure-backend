//interface de atendimento para tipar seus respectivos objetos
import IAtendimento from "../models/IAtendimento";

//interface a qual contém os métodos a serem implementados
import IAtendimentoRepository from "./IAtendimentoRepository";

import prisma from "../../../../shared/prisma/prismaClient";

//exporta e cria o repositório
export default class AtendimentoRepository implements IAtendimentoRepository
{
    //repositório para criar o atendimento
    async create(atendimento: IAtendimento): Promise<IAtendimento> 
    {
        console.log(atendimento)
        return <IAtendimento> <unknown> await prisma.atendimento.create(
            { data: {agendaId: atendimento.agendaId, clienteId: atendimento.clienteId, valorTotal: atendimento.valorTotal} });
    }

    //repositório para atualizar o atendimento
    async update(atendimento: IAtendimento, atendimentoId: number): Promise<void> 
    {
        console.log("----------------------")
        console.log("dentro do repository")
        console.log("atendimento", atendimento);
        console.log("console log do prisma", await prisma.atendimento.update({data: atendimento, where: {atendimentoId: atendimentoId}}));
        await prisma.atendimento.update({data: atendimento, where: {atendimentoId: atendimentoId}});
        console.log("O valor do atendimento foi atualizado.");
    }

    //repositório para deletar o atendimento
    async delete(atendimentoId: number): Promise<void> 
    {
        await prisma.atendimento.delete({where: {atendimentoId: atendimentoId}});
    }

    //repositório para consultar o atendimento
    async getUnique(atendimentoId: number): Promise<IAtendimento> 
    {
        return <IAtendimento> <unknown> await prisma.atendimento.findUnique({where: {atendimentoId: atendimentoId}, include: {cliente: true, atendimentoHasServico: {include: {servico: true}}, agenda: true}});
    }

    //repositório para consultar todos os atendimentos
    async getAll(): Promise<IAtendimento[]> 
    {
        return <IAtendimento[]> <unknown> await prisma.atendimento.findMany({include: {cliente: true, atendimentoHasServico: {include: {servico: true}}, agenda: true}});
    }
    
}