import { Component } from '@angular/core';

@Component({
  selector: 'app-reserva',
  templateUrl: 'reserva.page.html',
  styleUrls: ['reserva.page.scss']
})
export class ReservaPage {

  date: string;
  type: 'string';

  constructor( ) {}
 
onChange($event) {
    console.log($event);
  }
}
