
import IEndereco from "../../../endereco/data/entity/IEndereco";
import IFilialEntity from "../model/IFilialEntity";

export default interface IFilialRepository
{
    add(filial: IFilialEntity): Promise<void>;
    update(filial: IFilialEntity, filialId: number): Promise<void>;
    delete(filialId: number): Promise<void>;
    searchUnique(filialId: number): Promise<IFilialEntity>;
    searchAll(): Promise<IFilialEntity[]>;

}