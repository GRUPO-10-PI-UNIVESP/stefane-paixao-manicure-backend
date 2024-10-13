export default class Endereco
{
    private enderecoId!: number;
    private logradouro!: string;
    private numero!: string;
    private complemento!: string;
    private bairro!: string;
    private cidade!: string;
    private estado!: string;
    private cep!: string;

    // Getters
    public getEnderecoId(): number {
        return this.enderecoId;
    }

    public getLogradouro(): string {
        return this.logradouro;
    }

    public getNumero(): string {
        return this.numero;
    }

    public getComplemento(): string {
        return this.complemento;
    }

    public getBairro(): string {
        return this.bairro;
    }

    public getCidade(): string {
        return this.cidade;
    }

    public getEstado(): string {
        return this.estado;
    }

    public getCep(): string {
        return this.cep;
    }

    // Setters
    public setEnderecoId(enderecoId: number): void {
        this.enderecoId = enderecoId;
    }

    public setLogradouro(logradouro: string): void {
        this.logradouro = logradouro;
    }

    public setNumero(numero: string): void {
        this.numero = numero;
    }

    public setComplemento(complemento: string): void {
        this.complemento = complemento;
    }

    public setBairro(bairro: string): void {
        this.bairro = bairro;
    }

    public setCidade(cidade: string): void {
        this.cidade = cidade;
    }

    public setEstado(estado: string): void {
        this.estado = estado;
    }

    public setCep(cep: string): void {
        this.cep = cep;
    }
}