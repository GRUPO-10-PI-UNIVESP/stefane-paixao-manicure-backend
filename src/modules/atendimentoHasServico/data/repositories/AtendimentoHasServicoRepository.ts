//importação da interface para a implementação dos métodos da classe associativa
import IAtendimentoHasServicoRepository from "./IAtendimentoHasServicoRepository";

//importação do prisma para a persistência dos dados
import prisma from "../../../../shared/prisma/prismaClient";

//importação da interface para tipar a entidade associativa
import IAtendimentoHasServico from "../models/IAtendimentoHasServico";

//exporta e cria a classe que implementa os métodos da associação de atendimento e serviço
export default class AtendimentoHasServicoRepository implements IAtendimentoHasServicoRepository
{
    //método do repositório para inserir a associação na base de dados
    async addServiceToAtendimento(servicoId: number, atendimentoId: number): Promise<void> 
    {
        await prisma.atendimentoHasServico.create({data: {servicoId: servicoId, atendimentoId: atendimentoId}});
    }

    //método do repositório para remover a associação na base de dados
    async removeServiceFromAtendimento(atendimentoHasServicoId: number): Promise<void> 
    {
        await prisma.atendimentoHasServico.delete({where: {atendimentoHasServicoId: atendimentoHasServicoId}});
    }

    //método para obter a associação de atendimento e serviço na base de dados
    async getServicoHasAtendimento(servicoId: number, atendimentoId: number): Promise<IAtendimentoHasServico> 
    {
        return <IAtendimentoHasServico> <unknown> await prisma.atendimentoHasServico.findFirst({where: { atendimentoId: atendimentoId, AND: { servicoId: servicoId }}});
    }

    //método para obter os serviços de um determinado atendimento
    async getServicesFromAtendimento(atendimentoId: number): Promise<IAtendimentoHasServico[]> 
    {
        return <IAtendimentoHasServico[]> <unknown> await prisma.atendimentoHasServico.findMany({include: {atendimento: true, servico: true}, where: {atendimentoId: atendimentoId}});
    }

}