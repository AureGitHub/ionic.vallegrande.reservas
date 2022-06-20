import { Injectable } from "@angular/core";
import { DataService } from "src/app/services/bd/dataservice/data.service";
import { ItemCartaModel } from "../models/item-carta.model";

@Injectable({
    providedIn: 'root'
  })
  export class DataServiceTarea extends DataService {
  

    async getItemCarta(collectionName: string): Promise<ItemCartaModel[]> {
        return this.getAll(collectionName,null);       
    }

    saveItemNew(itemCarta: ItemCartaModel, collectionName: string ){
        return this.AddSinId(itemCarta,collectionName);

    }


    // management(collectionName: string, itemCarta: ItemCartaModel) {
    //     if (itemCarta.id == 'new') {
    //         return this.AddWithAudit(itemCarta,collectionName,'IdTarea');
    //     }
    //     else {
    //         return this.UpdateWithAudit(itemCarta,collectionName,'IdTarea');
    //     }
      
    // }

    borrar(collectionName: string, itemCarta: ItemCartaModel) {
        return this.removeWithAudit(itemCarta,collectionName,'IdTarea');
    
      }

  }