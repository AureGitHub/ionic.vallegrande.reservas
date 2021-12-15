import { Component, Input, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';


@Component({
  selector: 'reserva-component',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent  implements OnInit {

  @Input() reserva: Reserva;

  constructor(
   ) {
    }

  ngOnInit() {

    
       

  }

  
   
}
