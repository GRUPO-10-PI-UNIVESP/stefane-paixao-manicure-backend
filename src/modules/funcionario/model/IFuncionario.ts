import IEndereco from "../../endereco/data/entity/IEndereco";

export default interface IFuncionario
{
    id: number;
    nome: string;
    cpf: string;
    admissao: Date;
    desligamento: Date;
    cargo: string;
    salario: number;
    endereco: IEndereco;
}