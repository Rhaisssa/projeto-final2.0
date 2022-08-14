import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from '../../../model/signInData';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly mockUser: SignInData = new SignInData('user', 'test');
  authenticated = false;

  constructor(private router: Router) { }

    authenticate(signInData: SignInData): boolean {
    if (this.verifyCredentials(signInData)) {
      this.authenticated = true;
      this.router.navigate(['/home']);
      return true;
    }
    this.authenticated = false;
    return false;
  }

  private verifyCredentials(signInData: SignInData): boolean {
    return this.verifyLogin(signInData.getLogin()) && this.verifyPassword(signInData.getPassword());
  }

  private verifyLogin(email: string): boolean {
    return email === this.mockUser.getLogin();
  }

  private verifyPassword(password: string): boolean {
    return password === this.mockUser.getPassword();
  }

  logout() {
    this.authenticated = false;
    this.router.navigate(['']);
  }

  getIsAuthenticated(): boolean {
    return this.authenticated;
  }
}
