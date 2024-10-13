import IEndereco from "../../../endereco/data/entity/IEndereco";

export default interface IFilialEntity
{
    filialId: number;
    nome: string;
    endereco: IEndereco;
}