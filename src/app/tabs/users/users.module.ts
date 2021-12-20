import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersPage } from './users.page';
import { UsersPageRoutingModule } from './users-routing.module';



@NgModule({
  imports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: UsersPage }]),
    UsersPageRoutingModule,
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
