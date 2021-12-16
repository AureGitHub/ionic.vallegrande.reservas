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
// import { collection, doc, Firestore, setDoc } from 'firebase/firestore';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots, CollectionReference, query, where, DocumentReference 
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {


  userData: any;

  constructor(
    private firestore: Firestore,
   private auth: Auth) {

    authState(this.auth).subscribe(async user => {
      if (user) {
        // const document = doc(this.firestore, `users/${user.uid}`);
        // let extraData = await docSnapshots(document).toPromise();
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    })

     
   }


   getExtradata(id: string): Observable<any> {
    const document = doc(this.firestore, `users/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
      })
    );
  }



  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null);
  }

  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null && user?.perfil=='A');
  }


  get userLogged(): any {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return user;
  }



  saveExtra(extra: any) {
    const user = JSON.parse(localStorage.getItem('user'));
    user['perfil']=extra['perfil'];
    localStorage.setItem('user', JSON.stringify(user));

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

  create(email: string, password: string, fullName: string, perfil : string){



  return createUserWithEmailAndPassword(this.auth,email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullName,
                perfil
            };

            const usersRef =  doc(this.firestore, 'users', uid);
            return      setDoc(usersRef, data)
          });  
}

}