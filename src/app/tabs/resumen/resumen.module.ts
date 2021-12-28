import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResumenPage } from './resumen.page';
import { ResumenRoutingModule } from './resumen-routing.module';
import { ShareModule } from '../share.module';



@NgModule({
  imports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ResumenPage }]),
    ResumenRoutingModule,
    ShareModule
  ],
  declarations: [ResumenPage]
})
export class ResumenModule {}
