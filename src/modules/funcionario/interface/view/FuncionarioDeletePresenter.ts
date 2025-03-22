import IFuncionario from "../../model/IFuncionario";
import IFuncionarioDeleteServiceOutput from "../../service/delete/IFuncionarioDeleteServiceOutput";
import IFuncionarioUpdateServiceOutput from "../../service/update/IFuncionarioUpdateServiceOutput";
import IFuncionarioView from "./IFuncionarioView";

export default class FuncionarioDeletePresenter implements IFuncionarioDeleteServiceOutput
{
    async present(funcionario: IFuncionario): Promise<IFuncionarioView> 
    {
        return <IFuncionarioView> <unknown> funcionario;
        // return ({
        //     id: funcionario.id.toString(),
        //     nome: funcionario.nome,
        //     cpf: funcionario.cpf,
        //     cargo: funcionario.cargo,
        //     salario: funcionario.salario.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
        //     admissao: funcionario.admissao.toLocaleDateString(),
        //     desligamento: funcionario.desligamento.toLocaleDateString(),
        //     endereco: {
        //         bairro: funcionario.endereco.bairro,
        //         cep: funcionario.endereco.cep,
        //         cidade: funcionario.endereco.cidade,
        //         complemento: funcionario.endereco.complemento,
        //         enderecoId: funcionario.endereco.enderecoId,
        //         estado: funcionario.endereco.estado,
        //         logradouro: funcionario.endereco.logradouro,
        //         numero: funcionario.endereco.numero
        //     }
        // });
    }
    
}