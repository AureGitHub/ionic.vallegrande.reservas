import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share.module';
import { TareaRoutingModule } from './tarea-routing.module';
import { TareaPage } from './tarea.page';



@NgModule({
  imports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TareaPage }]),
    TareaRoutingModule,
    ShareModule
  ],
  declarations: [TareaPage]
})
export class TareaModule {}
