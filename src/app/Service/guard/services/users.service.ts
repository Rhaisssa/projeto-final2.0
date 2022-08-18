import { Injectable } from '@angular/core';
import { doc, docData, Firestore,setDoc } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { from, Observable, of, switchMap } from 'rxjs';
import { LoginData } from 'src/app/model/LoginData';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: Firestore, private authService: AuthService) {}


  get currentUserProfile$(): Observable<LoginData | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<LoginData>;
      })
    );
  }

  addUser(user: User): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }


}
