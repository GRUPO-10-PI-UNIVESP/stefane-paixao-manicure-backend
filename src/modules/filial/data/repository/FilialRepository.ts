import IFilialRepository from "./IFilialRepository";
import prisma from "../../../../shared/prisma/prismaClient";
import IFilialEntity from "../model/IFilialEntity";

export default class FilialRepository implements IFilialRepository
{
    async add(filial: IFilialEntity): Promise<void> 
    {
        await prisma.filial.create({data: filial});
    }

    async update(filial: IFilialEntity, filialId: number): Promise<void> 
    {
        await prisma.filial.update({data: filial, where: {filialId: filialId}});
    }

    async delete(filialId: number): Promise<void> 
    {
        await prisma.filial.delete({where: {filialId: filialId}});
    }

    async searchUnique(filialId: number): Promise<IFilialEntity> 
    {
        return <IFilialEntity> await prisma.filial.findUnique({where: {filialId: filialId}});
    }

    async searchAll(): Promise<IFilialEntity[]> 
    {
        return <IFilialEntity[]> await prisma.filial.findMany();
    }

}