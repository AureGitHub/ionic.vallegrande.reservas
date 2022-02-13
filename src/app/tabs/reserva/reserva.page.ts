import { Component, OnInit} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { error } from 'protractor';
import { cerrarServicio } from 'src/app/models/cerrarServicio';
import { AuthService } from 'src/app/services/auth.service';
import { DataServiceCerrado } from 'src/app/services/bd/dataservice/data.service.cerrado';
import { DataService } from 'src/app/services/data.service';
import { ShareService } from 'src/app/services/share.servies';
import { Reserva, Totales } from '../../models/reserva';
import { CerradoModel } from '../../services/bd/models/cerrado.model';


@Component({
  selector: 'app-reserva',
  templateUrl: 'reserva.page.html',
  styleUrls: ['reserva.page.scss']
})
export class ReservaPage implements OnInit {


  isAdmin : boolean = false;

  visibleCierreServicio : boolean = false;

  comidaCerrada : cerrarServicio;
  cenaCerrada : cerrarServicio;
  

  filtercomida: Reserva;
  filtercena: Reserva;

  openAltaEdit = false;

  servicio = {
    comida: new Totales(),
    cena: new Totales(),

  }


  prueba : Reserva;

  mesas: any[];


  eventSource;

  viewTitle;


  isToday: boolean;
  calendar = {
    mode: 'month' as CalendarMode,
    step: 30 as Step,
    currentDate: new Date(),

  };
  selectedTime: Date;

  public lstReservas: Reserva[];

  icon : any;
  servicioCierre: string;
  motivoCierre: string = 'Servicio lleno';

  constructor(
    private dataService: DataService,
    private dataServiceCerrado: DataServiceCerrado,
    private router: Router,
    private shareService : ShareService,
    public alertController: AlertController,
    private authService: AuthService
  ) {

    this.isAdmin = this.authService.isAdmin;

    this.icon = this.shareService.icon;

    this.filtercomida=new Reserva();
    this.filtercomida.servicio ='comida';
    this.filtercena=new Reserva();
    this.filtercena.servicio ='cena';

  }
  ngOnInit(): void {
    this.prueba = new Reserva();
    this.prueba.dia = 15;    
    this.loadEvents();

   

  }
  refreshCerrados() {
  
    this.dataServiceCerrado.getCerrados(this.selectedTime).then(lst=>{
      this.comidaCerrada = null;
      this.cenaCerrada = null;
      lst.forEach(cerrado =>{
        if(cerrado.servicio == 'comida'){
          this.comidaCerrada = cerrado;
        }
        else  if(cerrado.servicio == 'cena'){
          this.cenaCerrada = cerrado;
        }
      })

      var ls = lst;
    })
  }

  loadEvents() {
    //this.eventSource = this.createRandomEvents();


    this.dataService.getReservas().subscribe(data => {
      this.eventSource = [];
      data.forEach(reserva => {
        this.eventSource.push({
          title: reserva.nombre,
          startTime: reserva.fecha.toDate(),
          endTime: reserva.fecha.toDate(),
          allDay: false
        });
      });
    });




  }

  addReserva() {


    let navigationExtras: NavigationExtras = {
      state: {
        selectedTime: this.selectedTime,
        reserva: null,
        comidaCerrada: this.comidaCerrada,
        cenaCerrada: this.cenaCerrada
        
      }
    };

    this.router.navigate(['/tabs/reserva-update'], navigationExtras);

  }

  updateReserva(reserva: Reserva) {
    let navigationExtras: NavigationExtras = {
      state: {
        selectedTime: null,
        reserva,
        comidaCerrada: this.comidaCerrada,
        cenaCerrada: this.cenaCerrada
      }
    };

    this.router.navigate(['/tabs/reserva-update'], navigationExtras);
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

    this.selectedTime = ev.selectedTime;

    this.refreshCerrados();

    this.dataService.getReservasByDate(ev.selectedTime).subscribe(lst => {

      this.lstReservas = lst.sort(function (a, b) {

        if (a.servicio < b.servicio) { return 1; }
        if (a.servicio > b.servicio) { return -1; }
        return 0;
      });

      this.resumen();

    });



    

  }


  resumen() {

    this.servicio = {
      comida: new Totales(),
      cena: new Totales(),

    }



    this.lstReservas.forEach(reserva => {

      var servicioReserva = {
        comida: new Totales(),
        cena: new Totales(),
  
      };

      for (const property in this.servicio.comida) { //comida es igual que cena...mismos campos
        if (reserva[property]) {
          servicioReserva[reserva['servicio']][property] += parseInt(reserva[property]);
          this.servicio[reserva['servicio']][property] += parseInt(reserva[property]);
        }
        reserva['Adultos']=servicioReserva[reserva['servicio']].Adultos;
      }
      this.servicio[reserva['servicio']].mesas++;
    });
  }


  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }



  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };



  async abrirServicio(servicioCerrado: cerrarServicio){


    const alert1 = await this.alertController.create({
      header: `¿Desea abrir el servicio de ${servicioCerrado.servicio}?`,
      message: `El servicio de ${servicioCerrado.servicio} se abrirá`,
      buttons: [ {
        text: 'No',
        role: 'Cancelar',
        cssClass: 'secondary',
      },
      {
        text: 'Si',
        handler: () => {
          this.dataServiceCerrado.abrirServicio(servicioCerrado).then(
            ()=>{
              this.refreshCerrados();          
            },
            error => alert(error)
          )
          
        },
      },],
    });

    await alert1.present();

  }

  preCerrarServicio(servicio: string){
    this.visibleCierreServicio = true;
    this.servicioCierre = servicio;
  }

  cerrarServicio(){
    let cerrar: CerradoModel = {    
    
      id: null,
      fecha : new Date(this.selectedTime.getFullYear(), this.selectedTime.getMonth(),this.selectedTime.getDate()),
      servicio :  this.servicioCierre,
      motivo : this.motivoCierre
    }

    this.dataServiceCerrado.cerrarServicio(cerrar)
    .then(
      ()=>{
      this.visibleCierreServicio = false;    
      this.refreshCerrados();
      },
      error => alert(error)
    );

    

  }
}
