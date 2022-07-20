import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import CartaItemI from '../interfaces/carta.item.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CartaItemService extends BaseService {


  get dbPath(): string {
    return 'CartaItem';
  }

  getAllByKey(key: string){
    return this.getAllQ<CartaItemI>( [ where('key', '==', key)])

  }


}