import { Component, Input, OnInit } from '@angular/core';
import { cerrarServicio } from 'src/app/models/cerrarServicio';
import { Reserva } from 'src/app/models/reserva';
import { ShareService } from 'src/app/services/share.servies';


@Component({
  selector: 'cerrado-component',
  templateUrl: './cerrado.component.html',
  styleUrls: ['./cerrado.component.css']
})
export class CerradoComponent  implements OnInit {

  @Input() cerrado: cerrarServicio;


  icon : any;


  constructor(
    private shareService : ShareService
   ) {
    this.icon = this.shareService.icon;
    }

  ngOnInit() {

    
       

  }

  
   
}
