import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataServiceTarea } from '../services/bd/dataservice/data.service.tarea';
import { ShareCommunicationService } from '../services/share-communication.servies';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isAdmin : boolean = false;
  nombre : string = 'usuario';
  TareasPdteTotal : number = 0;
  constructor(
    private dataServiceTarea: DataServiceTarea,
    private authService: AuthService,
    private shareCommunicationService: ShareCommunicationService,

  ) {
    this.isAdmin = this.authService.isAdmin;
    this.nombre =this.authService.email ? this.authService.email.split('@')[0] : 'usuario';

    this.shareCommunicationService.TareasCountGet().subscribe(total => this.TareasPdteTotal = total)

   
  }

  async ngOnInit(): Promise<void> {
    let lsTareas = await this.dataServiceTarea.getTareas(1);
    this.TareasPdteTotal =!lsTareas ? 0 :  lsTareas.length;

  }

}
