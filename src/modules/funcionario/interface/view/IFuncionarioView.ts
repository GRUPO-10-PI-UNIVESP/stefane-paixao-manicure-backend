import { Endereco } from "@prisma/client";
import IFilialEntity from "../../../filial/data/model/IFilialEntity";

export default interface IFuncionarioView {
  id: string;
  nome: string;
  cpf: string;
  admissao: string;
  desligamento: string;
  cargo: string;
  salario: string;
  endereco: Endereco;
  filialId: number;
}
