import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosPage } from './empleados.page';


const routes: Routes = [
  {
    path: '',
    component: EmpleadosPage,
  }
];


@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [EmpleadosPage]
})
export class EmpleadosModule {}
