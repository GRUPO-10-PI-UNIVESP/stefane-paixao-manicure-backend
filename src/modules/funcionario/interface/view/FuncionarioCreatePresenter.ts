import IFuncionario from "../../model/IFuncionario";
import IFuncionarioCreateServiceOutput from "../../service/create/IFuncionarioCreateServiceOutput";
import IFuncionarioView from "./IFuncionarioView";

export default class FuncionarioCreatePresenter implements IFuncionarioCreateServiceOutput
{
    async present(funcionario: IFuncionario): Promise<IFuncionarioView>
    {
        return ({
            id: funcionario.id.toString(),
            nome: funcionario.nome,
            cpf: funcionario.cpf,
            cargo: funcionario.cargo,
            salario: funcionario.salario.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
            admissao: funcionario.admissao.toString(),
            desligamento: funcionario.desligamento?.toString(),
            endereco: {
                bairro: funcionario.endereco.bairro,
                cep: funcionario.endereco.cep,
                cidade: funcionario.endereco.cidade,
                complemento: funcionario.endereco.complemento,
                enderecoId: funcionario.endereco.enderecoId,
                estado: funcionario.endereco.estado,
                logradouro: funcionario.endereco.logradouro,
                numero: funcionario.endereco.numero
            }
        });
    }
}