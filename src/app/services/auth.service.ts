import { Injectable } from '@angular/core';

import {
  Auth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  authState} from '@angular/fire/auth';
// import { collection, doc, Firestore, setDoc } from 'firebase/firestore';
import {
  Firestore, collection, doc, setDoc, query, getDocs, getDoc, docSnapshots
} from '@angular/fire/firestore';
import { UserModel } from './bd/models/user.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class AuthService {


  userData: import("@angular/fire/auth").User;


  changedStateUser: Subject<any> = new Subject();



  constructor(
    private firestore: Firestore,
    private auth: Auth) {

    authState(this.auth).subscribe(async user => {
      let userInCache = null;
      if (user) {       
         userInCache = JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
      }
      this.changedStateUser.next(userInCache);
    })
  }



  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null);
  }

  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null && user?.perfil == 'A');
  }

  get email(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return user?.email;
  }

  get userLogged(): any {
    const user = JSON.parse(localStorage.getItem('user'));
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return user;
  }

  UserRefresh() {
    localStorage.setItem('user', null);
    
  }

  async login(email: string, password: string): Promise<any> {

    return new Promise(async resolve => {

      try{
        var userCredential = await signInWithEmailAndPassword(this.auth, email, password);
        this.userData = userCredential.user;
        const userRef = doc(this.firestore, `users/${this.userData.uid}`);
        // const q = query(userRef, where("id", "==", this.userData.uid));
        const querySnapshot = await getDoc(userRef);
        const data = querySnapshot.data();
  
        if (!data || data['perfil'] == 'B') {
          resolve('No está autorizado');
        }

        var userKeep = {
          perfil : data['perfil'],
          email : this.userData.email
        }
  
        // this.userData['perfil'] = data['perfil'];
  
        localStorage.setItem('user', JSON.stringify(userKeep));

        this.changedStateUser.next(userKeep);


        resolve(null);
      }
      catch(error){
        resolve(error);

      }
      

    })
  }

  logout(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      signOut(this.auth)
        .then(
          res => {
            localStorage.setItem('user', null);
            resolve(res);
          },
          err => reject(err)
        )
    })
  }

  ver() {
    var aa = this.auth;
  }

  async getUsers(): Promise<UserModel[]> {


    return new Promise<any>(async (resolve, reject) => {
      const userRef = collection(this.firestore, 'users');
      const q = query(userRef);
      const querySnapshot = await getDocs(q);
      let users: UserModel[] = [];

      querySnapshot.forEach((doc) => {
        let user = doc.data() as UserModel;
        user['id']=doc.id
        users.push(user);
      });
      resolve(users);
    });


  }

  async create(email: string, contrasena: string, perfil: string) {


    let created = await createUserWithEmailAndPassword(this.auth, email, contrasena);
    const uid = created.user.uid;
    const data = {
      id: uid,
      email,
      contrasena,
      perfil
    };

    const usersRef = doc(this.firestore, 'users', uid);
        return setDoc(usersRef, data)
  }


  cambiarEstado(user : UserModel,newEstado:string){
    const document = doc(this.firestore, 'users', user?.id);
      const { id, ...data } = user; // we don't want to save the id inside the document

      return setDoc(document, data);

  }

}