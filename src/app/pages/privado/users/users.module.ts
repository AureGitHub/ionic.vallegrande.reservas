import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersPage } from './users.page';


const routes: Routes = [
  {
    path: '',
    component: UsersPage,
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
  declarations: [UsersPage]
})
export class UsersModule {}
