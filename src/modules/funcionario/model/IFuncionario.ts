import IEndereco from "../../endereco/data/entity/IEndereco";
import IFilialEntity from "../../filial/data/model/IFilialEntity";

export default interface IFuncionario {
  id: number;
  nome: string;
  cpf: string;
  admissao: Date;
  desligamento: Date;
  cargo: string;
  salario: number;
  endereco: IEndereco;
  filialId: number;
}
