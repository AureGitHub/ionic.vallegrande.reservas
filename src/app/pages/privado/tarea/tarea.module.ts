import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TareaPage } from './tarea.page';


const routes: Routes = [
  {
    path: '',
    component: TareaPage,
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TareaPage }]),
  ],
  declarations: [TareaPage]
})
export class TareaModule {}
