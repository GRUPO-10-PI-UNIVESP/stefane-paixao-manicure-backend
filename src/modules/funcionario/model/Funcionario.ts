import IEndereco from "../../endereco/data/entity/IEndereco";
import IFuncionario from "./IFuncionario";

export default class Funcionario implements IFuncionario
{
    private _id: number;
    private _nome: string;
    private _cpf: string;
    private _admissao: Date;
    private _desligamento: Date;
    private _cargo: string;
    private _salario: number;
    private _endereco: IEndereco;

    constructor(id: number, nome: string, cpf: string, admissao: Date, desligamento: Date, cargo: string, salario: number, endereco: IEndereco)
    {
        this._id = id ?? 0;
        this._nome = nome;
        this._cpf = this.validateCPF(cpf);
        this._admissao = admissao;
        this._desligamento = desligamento ?? undefined;
        this._cargo = cargo ?? undefined;
        this._salario = salario ?? undefined;
        this._endereco = endereco ?? undefined;
    }

    public get id(): number 
    {
        return this._id;
    }
    
    public set id(value: number) 
    {
        this._id = value;
    }

    public get nome(): string 
    {
        return this._nome;
    }
    
    public set nome(value: string) 
    {
        this._nome = value;
    }

    public get cpf(): string 
    {
        return this._cpf;
    }

    public set cpf(value: string) 
    {
        this._cpf = this.validateCPF(value);
    }

    public get admissao(): Date 
    {
        return this._admissao;
    }

    public set admissao(value: Date) 
    {
        this._admissao = value;
    }

    public get desligamento(): Date 
    {
        return this._desligamento;
    }

    public set desligamento(value: Date) 
    {
        this._desligamento = value;
    }

    public get cargo(): string 
    {
        return this._cargo;
    }

    public set cargo(value: string) 
    {
        this._cargo = value;
    }

    public get salario(): number
    {
        return this._salario;
    }

    public set salario(value: number) 
    {
        this._salario = value;
    }

    public get endereco(): IEndereco 
    {
        return this._endereco;
    }

    public set endereco(value: IEndereco) 
    {
        this._endereco = value;
    }

    private validateCPF(value: string): string
    {
        value = value.replace(/\D/g, '');

        if(value.length > 11 || value.length < 11)
        {
            throw new Error("O número de dígitos não pode ser diferente a 11. ");
        }

        return value;
    }
}