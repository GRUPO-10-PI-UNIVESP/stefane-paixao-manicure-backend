import IFuncionario from "../../model/IFuncionario";
import IFuncionarioUpdateServiceOutput from "../../service/update/IFuncionarioUpdateServiceOutput";
import IFuncionarioView from "./IFuncionarioView";

export default class FuncionarioUpdatePresenter implements IFuncionarioUpdateServiceOutput
{
    async present(funcionario: IFuncionario): Promise<IFuncionarioView> 
    {
        return <IFuncionarioView> <unknown> funcionario;
        return ({
            id: funcionario.id.toString(),
            nome: funcionario.nome,
            cpf: funcionario.cpf,
            cargo: funcionario.cargo,
            salario: funcionario.salario.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
            admissao: funcionario.admissao.toLocaleDateString(),
            desligamento: funcionario.desligamento.toLocaleDateString(),
            endereco: {
                bairro: funcionario.endereco.bairro,
                cep: funcionario.endereco.cep,
                cidade: funcionario.endereco.cidade,
                complemento: funcionario.endereco.complemento,
                enderecoId: funcionario.endereco.enderecoId,
                estado: funcionario.endereco.estado,
                logradouro: funcionario.endereco.logradouro,
                numero: funcionario.endereco.numero
            },
            filial: {
                endereco: {
                    bairro: funcionario.filial.endereco.bairro,
                    cep: funcionario.filial.endereco.cep,
                    cidade: funcionario.filial.endereco.cidade,
                    complemento: funcionario.filial.endereco.complemento,
                    enderecoId: funcionario.filial.endereco.enderecoId,
                    estado: funcionario.filial.endereco.estado,
                    logradouro: funcionario.filial.endereco.logradouro,
                    numero: funcionario.filial.endereco.numero
                },
                nome: funcionario.filial.nome,
                filialId: funcionario.filial.filialId
            }
        });
    }
    
}