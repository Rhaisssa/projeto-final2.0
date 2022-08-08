export class SignInData {
    public usuario: string;
    public senha: string;

    constructor(usuario: string, senha: string) {
        this.usuario = usuario;
        this.senha = senha;
    }

    getUsuario(): string {
        return this.usuario;
    }

    getSenha(): string {
        return this.senha;
    }
}
