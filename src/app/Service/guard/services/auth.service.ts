import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, UserCredential, authState } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userNow = authState(this.auth);
  email: string;
  password: string;
  

  constructor(private auth: Auth) {}

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
}
