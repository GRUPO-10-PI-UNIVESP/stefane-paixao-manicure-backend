import ILogin from "../models/ILogin";

export default interface ILoginRepository
{
    criar(login: ILogin): Promise<void>;
    atualizar(login: ILogin, loginId: number): Promise<void>;
    delete(loginId: number): Promise<void>;
    buscar(loginId: number): Promise<ILogin>;
    buscarTodos(): Promise<ILogin[]>;
    logar(usuario: string, senha: string): Promise<ILogin>;
    recuperarSenha(email: string): Promise<void>;
}