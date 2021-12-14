import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { DataService } from 'src/app/services/data.service';
import { Reserva, Totales } from '../../models/reserva';

@Component({
  selector: 'app-reserva',
  templateUrl: 'reserva.page.html',
  styleUrls: ['reserva.page.scss']
})
export class ReservaPage implements OnInit {

  openAltaEdit = false;

  reserva : Reserva;

    servicio  = {
        comida : new  Totales(),
        cena  : new  Totales(),
    
      }

      Totales  = {
        comida : {
            Adultos : 0,
            ninos : 0
        },
        cena  : {
            Adultos : 0,
            ninos : 0
        }
    
      };
   

  eventSource;
    
  viewTitle;

  titleAdd: string='';

    isToday:boolean;
    calendar = {
        mode: 'month' as CalendarMode,
        step: 30 as Step,
        currentDate: new Date(),
       
    };
    selectedTime: Date;

    public lstReservas: Reserva[];

    constructor(
      private dataService: DataService,
      private router: Router
      ) {

    }
    ngOnInit(): void {
        this.loadEvents();
    }

    loadEvents() {
      //this.eventSource = this.createRandomEvents();
     

      this.dataService.getReservas().subscribe(data =>{
        this.eventSource  = [];
        data.forEach(reserva=>{
          this.eventSource.push({
            title: reserva.nombre,
            startTime:reserva.fecha.toDate(),
            endTime: reserva.fecha.toDate(),
            allDay: false
        });
        });
      });
     
        

      
    }

    addReserva(){

      this.reserva=null;
      this.openAltaEdit = true;

      return;

    let navigationExtras: NavigationExtras = {
        state: {
            selectedTime : this.selectedTime
        }
        };

    this.router.navigate(['/tabs/reserva-update'],navigationExtras);

    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {



        this.dataService.getReservasByDate(ev.selectedTime).subscribe(lst=>{
          this.resumen(lst);
          this.lstReservas = lst.sort(function (a, b) {
            if (a.servicio > b.servicio) {
              return 1;
            }}); 
        });


        
        // this.selectedTime = ev.selectedTime;
        this.titleAdd =  ev.selectedTime;
        // console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +

        // (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);



    }


    resumen(lst: Reserva[]) {

        this.servicio  = {
            comida : new  Totales(),
            cena  : new  Totales(),
        
          }


          this.Totales.comida.Adultos = 0;
          this.Totales.comida.ninos = 0;

          this.Totales.cena.Adultos = 0;
          this.Totales.cena.ninos = 0;

        lst.forEach(reserva => {
            for (const property in this.servicio.comida) { //comida es igual que cena...mismos campos
              if(reserva[property]){
                this.servicio[reserva['servicio']][property]+=parseInt(reserva[property]);
            }

            // this.Totales[reserva['servicio']].Adultos +=  this.servicio[reserva['servicio']].Adultos;
            //   this.Totales[reserva['servicio']].Ninos +=  this.servicio[reserva['servicio']].ninos;

          }
        });
      }


    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

   

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };
}
