import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaPageRoutingModule } from './reserva-routing.module';
import { ReservaPage } from './reserva.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { ReservaUpdatePageModule } from '../reserva-update/reserva-update.module';
import { ReservaUpdatePage } from '../reserva-update/reserva-update.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReservaPageRoutingModule,
    NgCalendarModule,
  ],
  declarations: [ReservaPage,ReservaUpdatePage]
})
export class ReservaPageModule {}
