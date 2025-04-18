//interface de atendimento para tipar seus respectivos objetos
import IAtendimento from "../models/IAtendimento";

//interface a qual contém os métodos a serem implementados
import IAtendimentoRepository from "./IAtendimentoRepository";

import prisma from "../../../../shared/prisma/prismaClient";

//exporta e cria o repositório
export default class AtendimentoRepository implements IAtendimentoRepository {

  //repositório para criar o atendimento
  async create(atendimento: IAtendimento): Promise<IAtendimento> {
    console.log(atendimento);
    return <IAtendimento>(<unknown>await prisma.atendimento.create({
      data: {
        agendaId: atendimento.agendaId,
        clienteId: atendimento.clienteId,
        filialId: atendimento.filialId,
        valorTotal: atendimento.valorTotal,
      },
    }));
  }

  //repositório para atualizar o atendimento
  async update(
    atendimento: IAtendimento,
    atendimentoId: number
  ): Promise<void> {
    await prisma.atendimento.update({
      data: {
        agendaId: atendimento.agendaId,
        filialId: atendimento.filialId,
        valorTotal: atendimento.valorTotal,
        clienteId: atendimento.clienteId,
      },
      where: { atendimentoId: atendimentoId },
    });
  }

  //repositório para deletar o atendimento
  async delete(atendimentoId: number): Promise<void> {
    const atendimento = await prisma.atendimento.findUnique({
      where: { atendimentoId: atendimentoId },
    });

    await prisma.atendimentoHasServico.deleteMany({
      where: { atendimentoId: atendimento?.atendimentoId },
    });
    await prisma.atendimento.delete({
      where: { atendimentoId: atendimento?.atendimentoId },
    });
  }

  //repositório para consultar o atendimento
  async getUnique(atendimentoId: number): Promise<IAtendimento> {
    return <IAtendimento>(<unknown>await prisma.atendimento.findUnique({
      where: { atendimentoId: atendimentoId },
      include: {
        cliente: true,
        atendimentoHasServico: { include: { servico: true } },
        agenda: true,
        filial: true
      },
    }));
  }

  //repositório para consultar todos os atendimentos
  async getAll(): Promise<IAtendimento[]> {
    return <IAtendimento[]>(<unknown>await prisma.atendimento.findMany({
      include: {
        cliente: true,
        atendimentoHasServico: { include: { servico: true } },
        agenda: true,
        filial: true
      },
    }));
  }

  async getMoreFrequentClients(): Promise<IAtendimento[]> 
  {
    const clientesContagem =
    await prisma.atendimento.groupBy({by: ['clienteId'], _count: {_all: true}});

    const clientesOrdenados = 
    await prisma.cliente.findMany({where: {clienteId: { in: clientesContagem.map((cliente => cliente.clienteId))}}, 
    orderBy: {atendimento: {_count: 'desc'}},include: {atendimento: true}});

    return <IAtendimento[]> <unknown> clientesOrdenados;
  }
}
