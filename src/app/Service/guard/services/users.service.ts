import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { LoginData } from 'src/app/model/LoginData';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  get currentUser(): Observable<LoginData | null> {
    return this.authService.userNow.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<LoginData>;
      })
    );
  }

  addUser(user: LoginData): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid ?? '');
    return from(setDoc(ref, user));
  }

  updateUser(user: LoginData): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid ?? '');
    return from(updateDoc(ref, { ...user }));
  }
}