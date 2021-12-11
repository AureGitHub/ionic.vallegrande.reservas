import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
    Auth,
    signOut,
    signInWithPopup,
    user,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail,
    getAdditionalUserInfo,
    OAuthProvider,
    linkWithPopup,
    unlink,
    updateEmail,
    updatePassword,
    User,
    reauthenticateWithPopup,
    authState,
    onAuthStateChanged
  } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    user$: Observable<User | null>;

  constructor(
   private auth: Auth) {
   }


 login(email: string, password: string): Promise<any> {


  return new Promise<any>((resolve, reject) => {
    signInWithEmailAndPassword(this.auth, email, password)
    .then(
      res => {
        this.user$ = authState(this.auth);
        this.user$.subscribe(user=> {
          console.log(user);
          resolve(res);
        })
        
      },
      err => reject(err))
  })
}

logout(): Promise<any>{
  return new Promise<any>((resolve, reject) => {
    signOut(this.auth)
    .then(
      res =>  resolve(res),
      err => reject(err)
      )
  })
}

ver(){
  var  aa=this.auth;
}

}