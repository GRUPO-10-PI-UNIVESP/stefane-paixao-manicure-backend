import IFilialRepository from "./IFilialRepository";
import prisma from "../../../../shared/prisma/prismaClient";
import IFilialEntity from "../model/IFilialEntity";
import IEndereco from "../../../endereco/data/entity/IEndereco";

export default class FilialRepository implements IFilialRepository {
  async add(filial: IFilialEntity): Promise<void> {
    console.log(filial);
    const enderecoInserido: IEndereco = await prisma.endereco.create({
      data: filial.endereco,
    });
    await prisma.filial.create({
      data: { nome: filial.nome, enderecoId: enderecoInserido.enderecoId },
    });
  }

  async update(filial: IFilialEntity, filialId: number): Promise<void> {
    await prisma.endereco.update({
      data: filial.endereco,
      where: { enderecoId: filial.endereco.enderecoId },
    });
    await prisma.filial.update({
      data: { nome: filial.nome, enderecoId: filial.endereco.enderecoId },
      where: { filialId: filialId },
    });
  }

  async delete(filialId: number): Promise<void> {
    const filial = await prisma.filial.findUnique({
      where: { filialId: filialId },
    });
    await prisma.endereco.delete({ where: { enderecoId: filial!.enderecoId } });
    await prisma.filial.deleteMany({ where: { filialId: filialId } });
  }

  async searchUnique(filialId: number): Promise<IFilialEntity> {
    return <IFilialEntity>await prisma.filial.findUnique({
      where: { filialId: filialId },
      select: { nome: true, endereco: true, filialId: true },
    });
  }

  async searchAll(): Promise<IFilialEntity[]> {
    return <IFilialEntity[]>await prisma.filial.findMany({
      select: { nome: true, endereco: true, filialId: true },
    });
  }
}
