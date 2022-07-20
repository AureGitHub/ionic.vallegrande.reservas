import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDocs, orderBy, query, QueryConstraint, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {


  get dbPath(): string {
    return '';
  }

    itemRef = collection(this.firestore, this.dbPath);

    constructor(private firestore: Firestore) { }


    add<T>(item: T) {
     
      return addDoc(this.itemRef, item);
    }
  
    getAll<T>(): Observable<T[]> {
      return collectionData(this.itemRef, { idField: 'id' }) as Observable<T[]>;
    }


    async getAllQ<T>(queryConstraints: QueryConstraint[], orderby=['id'] ): Promise<T[]> {

      return new Promise<T[]>(async (resolve, reject) => {
        const objRef = collection(this.firestore, this.dbPath);     
  
        let querySnapshot = null;
  
        if(!queryConstraints){
          queryConstraints=[];
        }

        const q = query(objRef, ...queryConstraints);
        //,orderBy(orderby.join(','))
          querySnapshot = await getDocs(q);

         
        let lstSal: T[] = [];
  
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          obj['id'] = doc.id;
          lstSal.push(obj);
        });
        resolve(lstSal);
      });
  
  
    }



    async getItemBycollectionName<T>(collectionName: string): Promise<T[]> {
      return new Promise<any[]>(async (resolve, reject) => {
        const objRef = collection(this.firestore, collectionName);     
  
        let querySnapshot = null;
        querySnapshot = await getDocs(objRef); 
         
        let lstSal: T[] = [];
  
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          obj['id'] = doc.id;
          lstSal.push(obj);
        });
        resolve(lstSal);
      });
  }

  
    delete<T>(item: T) {
      const itemDocRef = doc(this.firestore, `${this.dbPath}/${item['id']}`);
      return deleteDoc(itemDocRef);
    }

    update<T>(id: any, coche: T) {
      const itemDocRef = doc(this.firestore, `${this.dbPath}/${id}`);
      return updateDoc(itemDocRef,coche as any);
    }


}