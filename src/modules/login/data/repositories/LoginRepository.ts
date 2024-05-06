//importa a interface para tipar o login
import ILogin from "../models/ILogin";

//importa a interface implementada por ILoginRepository para a inversão de controle
import ILoginRepository from "./ILoginRepository";

//importação do ORM prisma
import prisma from "../../../../shared/prisma/prismaClient";

//cria e exporta a implementação dos métodos de persistência do banco de dados
export default class LoginRepository implements ILoginRepository
{
    async criar(login: ILogin): Promise<void> 
    {
        await prisma.login.create({data: login});
    }

    async atualizar(login: ILogin, loginId: number): Promise<void> 
    {
        await prisma.login.update({data: login, where: {loginId: loginId}});
    }

    async delete(loginId: number): Promise<void>    
    {
        await prisma.login.delete({where: {loginId: loginId}});
    }
    
    async buscar(loginId: number): Promise<ILogin> 
    {
        return <ILogin> await prisma.login.findUnique({where: {loginId}});
    }

    async buscarTodos(): Promise<ILogin[]> 
    {
        return <ILogin[]> await prisma.login.findMany();
    }

    async logar(usuario: string, senha: string): Promise<ILogin> 
    {
        return <ILogin> await prisma.login.findFirst({where: {usuario, AND: {senha}}});
    }

    async recuperarSenha(email: string): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }
    
}