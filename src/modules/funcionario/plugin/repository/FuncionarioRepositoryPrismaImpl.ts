import IFuncionarioRepository from "../../interface/repository/IFuncionarioRepository";
import IFuncionario from "../../model/IFuncionario";
import prisma from "../../../../shared/prisma/prismaClient";

export default class FuncionarioRepositoryPrismaImpl
  implements IFuncionarioRepository
{
  async create(funcionario: IFuncionario): Promise<void> {
    console.log(funcionario);
    await prisma.funcionario?.create({
      data: {
        admissao: funcionario?.admissao,
        cargo: funcionario?.cargo,
        desligamento: funcionario?.desligamento,
        nome: funcionario?.nome,
        cpf: funcionario?.cpf,
        salario: funcionario?.salario,
        endereco: {
          connectOrCreate: {
            where: { enderecoId: funcionario?.endereco?.enderecoId },
            create: {
              bairro: funcionario?.endereco.bairro,
              cep: funcionario?.endereco.cep,
              cidade: funcionario?.endereco.cidade,
              complemento: funcionario?.endereco.complemento,
              estado: funcionario?.endereco.estado,
              logradouro: funcionario?.endereco.logradouro,
              numero: funcionario?.endereco.numero,
            },
          },
        },
        filial: { connect: { filialId: funcionario?.filialId } },
      },
    });
  }

  async update(funcionario: IFuncionario, id: number): Promise<void> {
    await prisma.funcionario?.update({
      where: { id: id },
      data: {
        admissao: funcionario?.admissao,
        cargo: funcionario?.cargo,
        desligamento: funcionario?.desligamento,
        nome: funcionario?.nome,
        salario: funcionario?.salario,
        endereco: {
          update: {
            bairro: funcionario?.endereco.bairro,
            cep: funcionario?.endereco.cep,
            cidade: funcionario?.endereco.cidade,
            complemento: funcionario?.endereco.complemento,
            estado: funcionario?.endereco.estado,
            numero: funcionario?.endereco.numero,
            logradouro: funcionario?.endereco.logradouro,
          },
        },
        filial: {
          connect: { filialId: funcionario?.filialId },
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.funcionario?.delete({ where: { id: id } });
  }

  async readUnique(id: number): Promise<IFuncionario> {
    return <IFuncionario>(<unknown>await prisma.funcionario?.findUnique({
      where: { id: id },
      include: { endereco: true, filial: true },
    }));
  }

  async readUniqueByName(nome: string): Promise<IFuncionario> {
    return <IFuncionario>(<unknown>await prisma.funcionario?.findFirst({
      where: { nome: nome },
      include: { endereco: true, filial: true },
    }));
  }

  async readAll(): Promise<IFuncionario> {
    return <IFuncionario>(<unknown>await prisma.funcionario?.findMany({
      include: { endereco: true, filial: true },
    }));
  }
}
