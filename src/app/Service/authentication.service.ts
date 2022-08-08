import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from '../model/signInData';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly mockUser: SignInData = new SignInData('user', 'test');
  isAuthenticated = false;

  constructor(private router: Router) {}

  authenticate(signIn: SignInData): boolean {
    if (this.checkCredentials(signIn)) {
      this.isAuthenticated = true;
      this.router.navigate(['home']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  private checkCredentials(signIn: SignInData): boolean {
    return (
      this.checkUsuario(signIn.getUsuario()) &&
      this.checkSenha(signIn.getSenha())
    );
  }

  private checkUsuario(usuario: string): boolean {
    return usuario === this.mockUser.getUsuario();
  }

  private checkSenha(senha: string): boolean {
    return senha === this.mockUser.getSenha();
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
