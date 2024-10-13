import IEndereco from "../entity/IEndereco";

export default interface IEnderecoRepository
{
    add(endereco: IEndereco): Promise<void>;
    update(endereco: IEndereco, enderecoId: number): Promise<void>;
    delete(enderecoId: number): Promise<void>;
    findUnique(enderecoId: number): Promise<IEndereco>;
    findAll(): Promise<IEndereco[]>;
}