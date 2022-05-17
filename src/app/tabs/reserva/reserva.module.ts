import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaPageRoutingModule } from './reserva-routing.module';
import { ReservaPage } from './reserva.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { MyFilterPipe } from 'src/app/pipe/pipe.reserva.servicio';
import { ShareModule } from '../share.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReservaPageRoutingModule,
    NgCalendarModule,
    ShareModule,
    ComponentsModule
    
  ],
  declarations: [
    ReservaPage,
    MyFilterPipe ,
   
  ]
})
export class ReservaPageModule {}
