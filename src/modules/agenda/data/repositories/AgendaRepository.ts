import IAgenda from "../models/IAgenda";
import IAgendaRepository from "./IAgendaRepository";

import prisma from "../../../../shared/prisma/prismaClient";

export default class AgendaRepository implements IAgendaRepository
{
    async create(agenda: IAgenda): Promise<IAgenda> 
    {
        
        return await prisma.agenda.create({data: {dataHoraInicial: agenda.dataHoraInicial, dataHoraFinal: agenda.dataHoraFinal}});
    }

    async update(agenda: IAgenda, agendaId: number): Promise<void> 
    {
        await prisma.agenda.update({data: agenda, where: {agendaId: agendaId}});
    }

    async delete(agendaId: number): Promise<void> 
    {
        await prisma.agenda.delete({where: {agendaId: agendaId}});
    }

    async getAvailableAgenda(): Promise<IAgenda[]> 
    {
        return await prisma.$queryRaw ` SELECT * FROM agenda WHERE agendaId IS NOT IN atendimento`;
    }

    async getAgenda(agendaId: number): Promise<IAgenda>
    {
        return <IAgenda> await prisma.agenda.findUnique({where: {agendaId: agendaId}});
    }

    async getAllAgendas(): Promise<IAgenda[]> 
    {
        return await prisma.agenda.findMany({include: {atendimento: {include: {cliente: true, atendimentoHasServico: {include: {servico: true}}}}}});
    }
}