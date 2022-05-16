import { Component, OnInit} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { AuthService } from 'src/app/services/auth.service';
import { DataServiceCerrado } from 'src/app/services/bd/dataservice/data.service.cerrado';
import { DataServiceReserva } from 'src/app/services/bd/dataservice/data.service.reserva';
import { ReservaModel, Totales } from 'src/app/services/bd/models/reserva.model';
import { ShareService } from 'src/app/services/share.servies';
import { CerradoModel } from '../../services/bd/models/cerrado.model';


@Component({
  selector: 'app-reserva',
  templateUrl: 'reserva.page.html',
  styleUrls: ['reserva.page.scss']
})
export class ReservaPage implements OnInit {


  isAdmin : boolean = false;

  visibleCierreServicio : boolean = false;

  comidaCerrada : CerradoModel;
  cenaCerrada : CerradoModel;
  

  filtercomida: ReservaModel;
  filtercena: ReservaModel;

  openAltaEdit = false;

  servicio = {
    comida: new Totales(),
    cena: new Totales(),

  }


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
  TodayDate : Date;

  public lstReservas: ReservaModel[];

  icon : any;
  servicioCierre: string;
  motivoCierre: string = 'Servicio lleno';

  constructor(
    private dataServiceReserva: DataServiceReserva,
    private dataServiceCerrado: DataServiceCerrado,
    private router: Router,
    private shareService : ShareService,
    public alertController: AlertController,
    private authService: AuthService
  ) {

    this.isAdmin = this.authService.isAdmin;

    this.icon = this.shareService.icon;

    this.filtercomida=new ReservaModel();
    this.filtercomida.servicio ='comida';
    this.filtercena=new ReservaModel();
    this.filtercena.servicio ='cena';

  }
  ngOnInit(): void {
    this.loadEvents();
    this.TodayDate= new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
   

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


    this.dataServiceReserva.getReservasObs().subscribe(data => {
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

  updateReserva(reserva: ReservaModel) {
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

  async onTimeSelected(ev) {

    this.selectedTime = ev.selectedTime;

    this.refreshCerrados();

    var lst:ReservaModel[]=  await  this.dataServiceReserva.getReservasByDate(ev.selectedTime);

    this.lstReservas = lst.sort(function (a, b) {

      if (a.servicio < b.servicio) { return 1; }
      if (a.servicio > b.servicio) { return -1; }
      return 0;
    });

    this.resumen();

  

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



  async abrirServicio(servicioCerrado: CerradoModel){


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
