import { Injectable } from "@angular/core";
import { DataService } from "src/app/services/bd/dataservice/data.service";
import { ComandaModel } from "../models/comandas.model";

@Injectable({
    providedIn: 'root'
  })
  export class DataServiceComanda extends DataService {
  

    async getComandasDia(collectionName: string): Promise<ComandaModel[]> {
        return this.getAll(collectionName,null);       
    }

    saveItemNew(comandaDia: ComandaModel, collectionName: string ){

        for (const pp in comandaDia) {
            if(comandaDia[pp]==null){
                delete comandaDia[pp];
            }
          
          }
          

        if(!comandaDia['id']){  
            // si no tiene id, es un alta. Borro la propiedad para que no la cree
            delete comandaDia['id'];
            return this.AddSinId(comandaDia,collectionName);
        }
        else{
            return this.Update(comandaDia,collectionName);
        }

    }


    // management(collectionName: string, itemCarta: ItemCartaModel) {
    //     if (itemCarta.id == 'new') {
    //         return this.AddWithAudit(itemCarta,collectionName,'IdTarea');
    //     }
    //     else {
    //         return this.UpdateWithAudit(itemCarta,collectionName,'IdTarea');
    //     }
      
    // }

    borrar(collectionName: string, comandaDia: ComandaModel) {
        return this.removeWithAudit(comandaDia,collectionName,'IdTarea');
    
      }

  }