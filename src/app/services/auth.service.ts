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

  userData: any;

  constructor(
   private auth: Auth) {

    authState(this.auth).subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    })

     
   }


  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null);
  }


  get userLogged(): any {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return user;
  }



 login(email: string, password: string): Promise<any> {
  return  signInWithEmailAndPassword(this.auth, email, password);
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