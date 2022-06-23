import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CerradoComponent } from './cerrado/cerrado.component';
import { ReservaComponent } from './reserva/reserva.component';



@NgModule({
  
  imports: [
    IonicModule,
    CommonModule,
  ],
  declarations: [
    CerradoComponent,
    ReservaComponent,
  ],
  exports:      [ 
    CerradoComponent,
    ReservaComponent,
  ],

})
export class ComponentsReservaModule {}
