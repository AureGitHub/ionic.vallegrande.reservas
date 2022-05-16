import { Injectable } from "@angular/core";
import { QueryConstraint, where } from "firebase/firestore";
import { Observable } from "rxjs";
import { ReservaModel } from "../models/reserva.model";
import { DataService } from "./data.service";

@Injectable({
    providedIn: 'root'
  })
  export class DataServiceReserva extends DataService {
  
    collectionName: string = 'reservas';

   
    getReservasObs(): Observable<any[]> {

        return this.getAllObs(this.collectionName);
    
      }


    async getReservas(): Promise<ReservaModel[]> {
        return this.getAll(this.collectionName,null);
    }

    

    getReservasByDate(fecha: Date): Promise<ReservaModel[]> {

        if (!fecha) {
            return;
        }
      
        var startDay = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    
        var endDay = new Date(startDay);
    
        endDay.setDate(endDay.getDate() + 1);
        endDay.setSeconds(-1);


        return this.getAll(this.collectionName,
            [
                where('fecha', '>=', startDay),
                where('fecha', '<=', endDay),
            ]
            );
    }

    getReservasResumen(): Promise<ReservaModel[]> {

        var hoy = new Date();
    
        var startDay = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        return this.getAll(this.collectionName,
            [
                where("fecha", ">=", startDay)
            ]
            );
      }
    


      management(reserva: ReservaModel) {
        if (reserva.id == 'new') {
            return this.AddWithAudit(reserva,this.collectionName,'IdReserva');
        }
        else {
            return this.UpdateWithAudit(reserva,this.collectionName,'IdReserva');
        }
      
    }

    borrar(reserva: ReservaModel) {
        return this.removeWithAudit(reserva,this.collectionName,'IdReserva');
    
      }

  }