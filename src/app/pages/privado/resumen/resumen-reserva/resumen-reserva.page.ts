import { Component, OnInit } from '@angular/core';
import { DataServiceCerrado } from 'src/app/services/bd/dataservice/data.service.cerrado';
import { DataServiceReserva } from 'src/app/services/bd/dataservice/data.service.reserva';
import { CerradoModel } from 'src/app/services/bd/models/cerrado.model';
import { ReservaModel } from 'src/app/services/bd/models/reserva.model';
import { ShareService } from 'src/app/services/share.servies';



class ItemResumen{
  fecha : string;

  CierreComidaDia: CerradoModel;
  lstComidas: ReservaModel[];  
  CierreCenaDia: CerradoModel;
  lstCenas: ReservaModel[];
  

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
  selector: 'app-resumen-reserva',
  templateUrl: 'resumen-reserva.page.html',
  styleUrls: ['resumen-reserva.page.scss']
})



export class ResumenReservaPage  implements OnInit {


  lstResumen : ItemResumen[];

  constructor(   
    private dataServiceReserva: DataServiceReserva,
    private dataServiceCerrado: DataServiceCerrado,
    private shareService: ShareService
    ) {
   
    }
 
    ngOnInit(): void {
      this.shareService.changedTitleMenu.next('R. Reservas');
    }

    ionViewWillEnter(){
      this.loadReservas();
    }

    async loadReservas(){

      
      this.lstResumen = [];      
      const lstCierres:CerradoModel[] = await this.dataServiceCerrado.getCerradosResumen();       
      const lstReservas:ReservaModel[]= await this.dataServiceReserva.getReservasResumen();
        
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
