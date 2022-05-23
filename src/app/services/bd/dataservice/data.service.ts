import { Injectable } from '@angular/core';
import {
  Firestore, collection, doc, setDoc, deleteDoc, query, getDocs, QueryConstraint, where, CollectionReference, collectionData, getDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.servies';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private shareService: ShareService
  ) { }


  async get(collectionName: string, uid: any){
    const objRef = doc(this.firestore, `${collectionName}/${uid}`);
    // const q = query(userRef, where("id", "==", this.userData.uid));
    const querySnapshot = await getDoc(objRef);
    return querySnapshot.data();
  }

 //Con este método, al subcribirme a el es capaz de detectar los cambios de la colección
    //en FireBase
  getAllObs(collectionName: string): Observable<any[]> {

    return collectionData<any>(
      query<any>(
        collection(this.firestore, collectionName) as CollectionReference<any>,
      ),
    );

  }

  getAllObsParams(collectionName: string, queryConstraints: QueryConstraint[]): Observable<any[]> {

    if(queryConstraints){
      return collectionData<any>(
        query<any>(collection(this.firestore, collectionName) as CollectionReference<any>, ...queryConstraints)
        );

    }
    else{
      return collectionData<any>(
        query<any>(
          collection(this.firestore, collectionName) as CollectionReference<any>,
        ),
      );

    }

    

  }



  async getAll(collectionName: string, queryConstraints: QueryConstraint[] ): Promise<any[]> {

    return new Promise<any[]>(async (resolve, reject) => {
      const objRef = collection(this.firestore, collectionName);     

      let querySnapshot = null;

      if(queryConstraints){
        const q = query(objRef, ...queryConstraints);
        querySnapshot = await getDocs(q);
      }
      else{
        querySnapshot = await getDocs(objRef);
      }

       
      let lstSal: any[] = [];

      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj['id'] = doc.id;
        lstSal.push(obj);
      });
      resolve(lstSal);
    });


  }


  Add(obj: any,collectionName: string ){
    obj.id = '';
    const document = doc(collection(this.firestore, collectionName));
    return setDoc(document, obj);
  }

  AddWithAudit(obj: any,collectionName: string,fk_audit: string){
    const { id, ...obj_audit } = obj;
    obj_audit['cuando'] = new Date();
    obj_audit['quien'] = this.authService.userLogged.email;
  
    obj.id = '';
    const document = doc(collection(this.firestore, collectionName));
    obj_audit[fk_audit] = document.id;
    obj_audit['operacion'] = this.shareService.operacion_audit.alta;

    const document_audit = doc(collection(this.firestore,`${collectionName}_audit`));

    return Promise.all([setDoc(document, obj), setDoc(document_audit, obj_audit)]);

  }


  Update(obj: any,collectionName: string){
    const document = doc(this.firestore, collectionName, obj?.id);
    const { id, ...data } = obj; // we don't want to save the id inside the document

    return setDoc(document, data);
  }


  UpdateWithAudit(obj: any,collectionName: string,fk_audit: string){
    const { ...obj_audit } = obj;

    delete obj_audit.id;
    obj_audit['cuando'] = new Date();
    obj_audit['quien'] = this.authService.userLogged.email;

   
    const document = doc(this.firestore, collectionName, obj?.id);
    const document_audit = doc(collection(this.firestore, `${collectionName}_audit`));
    obj_audit[fk_audit] = document.id;
    obj_audit['operacion'] = this.shareService.operacion_audit.modificacion;
    const { id, ...data } = obj; // we don't want to save the id inside the document

    return Promise.all([setDoc(document, obj), setDoc(document_audit, obj_audit)]);
    
  }


  remove(obj: any,collectionName: string){
    const document = doc(this.firestore, collectionName, obj.id);
    return deleteDoc(document);
  }

  removeWithAudit(obj: any,collectionName: string,fk_audit: string){
    const document = doc(this.firestore, collectionName, obj.id);
    const document_audit = doc(collection(this.firestore, `${collectionName}_audit`));

    const { id, ...obj_audit } = obj;
    obj_audit['cuando'] = new Date();
    obj_audit['quien'] = this.authService.userLogged.email;
    obj_audit[fk_audit] = document.id;
    obj_audit['operacion'] = this.shareService.operacion_audit.borrado;

    return Promise.all([deleteDoc(document), setDoc(document_audit, obj_audit)]);
  }

  
}
