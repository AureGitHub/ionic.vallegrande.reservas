import { Injectable } from "@angular/core";
import { QueryConstraint, where } from "firebase/firestore";
import { CerradoModel } from "../models/cerrado.model";
import { DataService } from "./data.service";

@Injectable({
    providedIn: 'root'
  })
  export class DataServiceCerrado extends DataService {
  
    collectionName: string = 'cerrar_servicio';


    cerrarServicio(cerrar: CerradoModel) {
        return this.Add(cerrar,this.collectionName);
    
      }
    
    
      abrirServicio(cerrar: any) {
        return this.remove(cerrar,this.collectionName);
      }
    
    
    
      async getCerrados(fecha: Date): Promise<CerradoModel[]> {
    
        var fechaSinTime = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());

        return this.getAll(this.collectionName,
            [
                where("fecha", "==", fechaSinTime)
            ]
            );
    
      }
    
    
    
      async getCerradosResumen(): Promise<CerradoModel[]> {
    
        var hoy = new Date();
        var fechaSinTime = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

        return this.getAll(this.collectionName,
            [
                where("fecha", ">=", fechaSinTime)
            ]
            );
    
      }


  }