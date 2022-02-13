import { Injectable } from "@angular/core";
import { QueryConstraint, where } from "firebase/firestore";
import { TareaModel } from "../models/tarea.model";
import { DataService } from "./data.service";

@Injectable({
    providedIn: 'root'
  })
  export class DataServiceTarea extends DataService {
  
    collectionName: string = 'tareas';

    async getTareas(estado: number): Promise<TareaModel[]> {

        if(!estado){
            return this.getAll(this.collectionName,null);
          }
          else{
            return this.getAll(this.collectionName,
                [
                where("estado", "==", estado),
                ]
                );
          }

          

       
    }


    management(tarea: TareaModel) {
        if (tarea.id == 'new') {
            return this.AddWithAudit(tarea,this.collectionName,'IdTarea');
        }
        else {
            return this.UpdateWithAudit(tarea,this.collectionName,'IdTarea');
        }
      
    }

    borrar(tarea: TareaModel) {
        return this.removeWithAudit(tarea,this.collectionName,'IdTarea');
    
      }

  }