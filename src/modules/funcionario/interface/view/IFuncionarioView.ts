import { Endereco } from "@prisma/client";

export default interface IFuncionarioView 
{
    id: string;
    nome: string;
    cpf: string;
    admissao: string;
    desligamento: string;
    cargo: string;
    salario: string;
    endereco: Endereco;
}