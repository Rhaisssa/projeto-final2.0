export class SignInData {
    private email: string;
    private password: string;

    constructor(email: string, password: string) {
      console.log("email dentro da classe signInData: " + email)
        this.email = email;
        this.password = password;
    }

    getLogin(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }
}
