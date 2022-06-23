import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { HomePage } from './home.page';
import { RouterModule, Routes } from '@angular/router';
import { CartaService } from '../../privado/carta/servicios/carta.service';
import { DataServiceItemCarta } from '../../privado/carta/data-service/data.service.item-carta';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage],
  providers: [CartaService,DataServiceItemCarta]
})
export class HomeModule {}
