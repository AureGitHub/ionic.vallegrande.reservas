import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ResumenPage } from './resumen.page';
import { ResumenReservaPage } from './resumen-reserva/resumen-reserva.page';
import { CerradoComponent } from '../reserva/components/cerrado/cerrado.component';
import { ReservaComponent } from '../reserva/components/reserva/reserva.component';


const routes: Routes = [
  {
    path: '',
    component: ResumenPage,
  },
  {
    path: 'reservas',
    component: ResumenReservaPage,
  }
];


@NgModule({
  declarations: [ CerradoComponent,
    ReservaComponent,ResumenPage, ResumenReservaPage ],
  imports: [
   
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
    
    
})
export class ResumenPageModule {}
