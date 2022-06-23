import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ResumenPage } from './resumen.page';
import { ResumenReservaPage } from './resumen-reserva/resumen-reserva.page';
import { ComponentsReservaModule } from '../reserva/components/components-reserva.module';


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
  declarations: [ ResumenPage, ResumenReservaPage ],
  imports: [
   
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsReservaModule
  ],
  exports: [RouterModule]
    
    
})
export class ResumenModule {}
