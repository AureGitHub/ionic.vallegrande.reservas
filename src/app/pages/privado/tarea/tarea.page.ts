import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataServiceTarea } from 'src/app/services/bd/dataservice/data.service.tarea';
import { TareaModel } from 'src/app/services/bd/models/tarea.model';
import { ShareCommunicationService } from 'src/app/services/share-communication.servies';
import { ShareService } from 'src/app/services/share.servies';
import { CerradoModel } from 'src/app/services/bd/models/cerrado.model';
import { ReservaModel } from 'src/app/services/bd/models/reserva.model';



class ItemResumen {
  fecha: string;

  CierreComidaDia: CerradoModel;
  lstComidas: ReservaModel[];
  CierreCenaDia: CerradoModel;
  lstCenas: ReservaModel[];


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

  lsTareas: TareaModel[];

  icon: any;

  constructor(
    private dataServiceTarea: DataServiceTarea,
    private shareService: ShareService,
    public alertController: AlertController,
    private shareCommunicationService: ShareCommunicationService,
  ) {
    this.icon = this.shareService.icon;
  }

  ngOnInit(): void {
    this.shareService.changedTitleMenu.next('Tareas');
  }

  addTarea() {
    let tarea: any = { id: 'new', texto: this.newTarea, estado: 1 };
    this.dataServiceTarea.management(tarea).then(() => {
      this.newTarea = '';
      this.loadTareas();
    })
  }

  ionViewWillEnter() {
    this.newTarea = '';
    this.loadTareas();
  }

  async loadTareas() {
    this.lsTareas = await this.dataServiceTarea.getTareas(this.chEstado ? 1 : null);

    const lsTareasPdte = this.lsTareas.filter(a=> a.estado==1);

    this.shareCommunicationService.TareasCountSend(lsTareasPdte.length);



  }

  TareaChange(tarea: TareaModel, event) {
    var obj = event.target as HTMLInputElement;

    tarea.texto = obj.value;

    this.dataServiceTarea.management(tarea).then(() => {
      this.newTarea = '';
      this.loadTareas();
    })



  }


  async CambiarEstado(tarea: TareaModel, newEstado: number) {


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
            this.dataServiceTarea.management(tarea).then(() => {
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
      this.dataServiceTarea.management(tarea).then(() => {
        this.newTarea = '';
        this.loadTareas();
      })
    }


   








  }

  async Borrar(tarea: TareaModel) {

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
          this.dataServiceTarea.borrar(tarea).then(() => {
            this.newTarea = '';
            this.loadTareas();
          })
        },
      },],
    });

    await alert.present();






  }



}
