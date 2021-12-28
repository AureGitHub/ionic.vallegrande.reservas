import { Component, OnInit } from '@angular/core';
import { cerrarServicio } from 'src/app/models/cerrarServicio';
import { Reserva } from 'src/app/models/reserva';
import { DataService } from 'src/app/services/data.service';



class ItemResumen{
  fecha : string;

  CierreComidaDia: cerrarServicio;
  lstComidas: Reserva[];  
  CierreCenaDia: cerrarServicio;
  lstCenas: Reserva[];
  

  get fechaReal(): Date {
    return new Date(
      parseInt(this.fecha.split('/')[2]), 
      parseInt(this.fecha.split('/')[1])-1, 
      parseInt(this.fecha.split('/')[0])) 
}
constructor(){
}

}


@Component({
  selector: 'app-resumen',
  templateUrl: 'resumen.page.html',
  styleUrls: ['resumen.page.scss']
})



export class ResumenPage  implements OnInit {


  lstResumen : ItemResumen[];

  constructor(   
    private dataService: DataService,
    ) {
   
    }
 
    ngOnInit(): void {
    }

    ionViewWillEnter(){
      this.loadReservas();
    }

    async loadReservas(){

      
      this.lstResumen = [];      
      const lstCierres:cerrarServicio[] = await this.dataService.getCerradosResumen();       
      const lstReservas:Reserva[]= await this.dataService.getReservasResumen();
        
      const lstFechasReservas = [... new Set(lstReservas.map(a=> a.fecha.toDate().toLocaleDateString()))];
      const lstFechasCierres = [... new Set(lstCierres.map(a=> a.fecha.toDate().toLocaleDateString()))];



      lstFechasReservas.forEach(fecha => {
          let itemR : ItemResumen = new ItemResumen();
          itemR.fecha = fecha;
          this.lstResumen.push(itemR);
        });


        lstFechasCierres.forEach(fecha => {
          if(!this.lstResumen.some(a=> a.fecha == fecha)){
            let itemR : ItemResumen = new ItemResumen();
            itemR.fecha = fecha;
            this.lstResumen.push(itemR);
          }
          
        });

        this.lstResumen.forEach(itemResumen => {
          itemResumen.CierreComidaDia = lstCierres.find(a=> a.fecha.toDate().toLocaleDateString() == itemResumen.fecha && a.servicio=='comida');
          itemResumen.CierreCenaDia = lstCierres.find(a=> a.fecha.toDate().toLocaleDateString() == itemResumen.fecha && a.servicio=='cena');

          itemResumen.lstComidas = lstReservas.filter(a=> a.fecha.toDate().toLocaleDateString() == itemResumen.fecha && a.servicio=='comida');
          itemResumen.lstCenas = lstReservas.filter(a=> a.fecha.toDate().toLocaleDateString() == itemResumen.fecha && a.servicio=='cena');

          // if(CierreComidaDia){
          //   itemResumen.lsteventos.push(`Servicio COMIDA cerrado => ${CierreComidaDia.motivo}`)
          // }

          // lstComidaDia.forEach(comida =>{
          //   const Adultos = comida.getAdultos();
          //   itemResumen.lsteventos.push(`COMIDA => ${comida.nombre}  ${Adultos} y ${comida.ninos} pax`)
          // })


          // if(CierreCenaDia){
          //   itemResumen.lsteventos.push(`Servicio CENA cerrado => ${CierreCenaDia.motivo}`)
          // }


          // lstCenaDia.forEach(cena =>{
          //   const Adultos = cena.getAdultos();
          //   itemResumen.lsteventos.push(`CENA => ${cena.nombre}  ${Adultos} y ${cena.ninos} pax`)
          // })


        });



        this.lstResumen =  this.lstResumen.sort(function (a, b) {
          if (a.fechaReal > b.fechaReal) {
            return 1;
          }
          if (a.fechaReal < b.fechaReal) {
            return -1;
          }
          // a must be equal to b
          return 0;
        })


    }

   
}
