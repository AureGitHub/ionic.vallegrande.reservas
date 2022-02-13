import { Component, Input, OnInit } from '@angular/core';
import { ReservaModel } from 'src/app/services/bd/models/reserva.model';
import { ShareService } from 'src/app/services/share.servies';


@Component({
  selector: 'reserva-component',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent  implements OnInit {

  @Input() reserva: ReservaModel;
  @Input() verServicio: boolean;
  


  icon : any;


  constructor(
    private shareService : ShareService
   ) {
    this.icon = this.shareService.icon;
    }

  ngOnInit() {

    
       

  }

  
   
}
