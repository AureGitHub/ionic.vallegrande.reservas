import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CerradoComponent } from './reserva/cerrado.component/cerrado.component';
import { ReservaComponent } from './reserva/reserva.component/reserva.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
   
    CerradoComponent,
    ReservaComponent,
    
  ],
  
  exports: [
    CerradoComponent,
    ReservaComponent,
  ]
})
export class ShareModule {}
