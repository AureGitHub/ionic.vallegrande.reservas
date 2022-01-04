import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { cerrarServicio } from 'src/app/models/cerrarServicio';
import { Reserva } from 'src/app/models/reserva';
import { Tarea } from 'src/app/models/tareas';
import { DataService } from 'src/app/services/data.service';
import { ShareService } from 'src/app/services/share.servies';



class ItemResumen {
  fecha: string;

  CierreComidaDia: cerrarServicio;
  lstComidas: Reserva[];
  CierreCenaDia: cerrarServicio;
  lstCenas: Reserva[];


  get fechaReal(): Date {
    return new Date(
      parseInt(this.fecha.split('/')[2]),
      parseInt(this.fecha.split('/')[1]) - 1,
      parseInt(this.fecha.split('/')[0]))
  }
  constructor() {
  }

}


@Component({
  selector: 'app-tarea',
  templateUrl: 'tarea.page.html',
  styleUrls: ['tarea.page.scss']
})



export class TareaPage implements OnInit {

  chEstado: boolean = true;
  newTarea: string;

  lsTareas: Tarea[];

  icon: any;

  constructor(
    private dataService: DataService,
    private shareService: ShareService,
    public alertController: AlertController,
  ) {
    this.icon = this.shareService.icon;
  }

  ngOnInit(): void {
  }

  addTarea() {
    let tarea: any = { id: 'new', texto: this.newTarea, estado: 1 };
    this.dataService.managemenTarea(tarea).then(() => {
      this.newTarea = '';
      alert('Tarea creada');
      this.loadTareas();
    })
  }

  ionViewWillEnter() {
    this.newTarea = '';
    this.loadTareas();
  }

  async loadTareas() {
    this.lsTareas = await this.dataService.getTareas(this.chEstado ? 1 : null);
  }

  TareaChange(tarea: Tarea, event) {
    var obj = event.target as HTMLInputElement;

    tarea.texto = obj.value;

    this.dataService.managemenTarea(tarea).then(() => {
      this.newTarea = '';
      this.loadTareas();
    })



  }


  async CambiarEstado(tarea: Tarea, newEstado: number) {


    if(newEstado == 2){  // a finalizada
      const alert = await this.alertController.create({
        header: '¿Desea cambiar el estado la tarea a FINALIZADA?',
        message: 'La tarea cambiará el estado a finalizado',
        buttons: [{
          text: 'No',
          role: 'Cancelar',
          cssClass: 'secondary',
        },
        {
          text: 'Sí',
          handler: () => {
            tarea.estado = newEstado;
            this.dataService.managemenTarea(tarea).then(() => {
              this.newTarea = '';
              this.loadTareas();
            })
          },
        },],
      });
  
      await alert.present();
    }
    else{ // a pendiente de nuevo
      tarea.estado = newEstado;
      this.dataService.managemenTarea(tarea).then(() => {
        this.newTarea = '';
        this.loadTareas();
      })
    }


   








  }

  async Borrar(tarea: Tarea) {

    const alert = await this.alertController.create({
      header: '¿Desea borrar la tarea?',
      message: 'La tarea se borrará de forma permanente',
      buttons: [{
        text: 'No',
        role: 'Cancelar',
        cssClass: 'secondary',
      },
      {
        text: 'Sí',
        handler: () => {
          this.dataService.borrarTarea(tarea).then(() => {
            this.newTarea = '';
            this.loadTareas();
          })
        },
      },],
    });

    await alert.present();






  }



}
