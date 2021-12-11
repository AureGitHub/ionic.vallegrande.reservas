import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { DataService } from 'src/app/services/data.service';
import { Reserva } from '../../models/reservas';

@Component({
  selector: 'app-reservas-dia',
  templateUrl: 'reservas-dia.page.html',
  styleUrls: ['reservas-dia.page.scss']
})
export class ReservaDiaPage implements OnInit {

    constructor(
      private navController:NavController,
      private dataService: DataService,
      private router: Router
      ) {

    }
    ngOnInit(): void {
       
    }

    volver(){
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
    }

}
