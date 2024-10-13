export default class FilialEntity
{
    private _filialId!: number;
    private _nome!: string;
    private _enderecoId!: number;

    public get filialId(): number 
    {
        return this._filialId;
    }

    public set filialId(value: number) 
    {
        this._filialId = value;
    }

    public get nome(): string 
    {
        return this._nome;
    }

    public set nome(value: string) 
    {
        this._nome = value;
    }

    public get enderecoId(): number 
    {
        return this._enderecoId;
    }

    public set enderecoId(value: number) 
    {
        this._enderecoId = value;
    }
}