import { Injectable } from "@angular/core";
import { QueryConstraint, where } from "firebase/firestore";
import { TareaModel } from "../models/tarea.model";
import { DataService } from "./data.service";

@Injectable({
    providedIn: 'root'
  })
  export class DataServiceUser extends DataService {
  
    collectionName: string = 'users';

    async getUser( uid: any){
        var user = await this.get(this.collectionName,uid);
        return user;
      }

  }