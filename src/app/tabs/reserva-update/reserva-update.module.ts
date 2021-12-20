import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCalendarModule } from 'ionic2-calendar';
import { ReservaUpdatePage } from './reserva-update.page';
import { ReservaUpdatePageRoutingModule } from './reserva-update.routing.module';
import { ShareModule } from '../share.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReservaUpdatePageRoutingModule,
    NgCalendarModule,
    ShareModule
    
  ],
  declarations: [ReservaUpdatePage],
})
export class ReservaUpdatePageModule {}
