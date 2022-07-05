import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReloadPage } from './reload.page';


const routes: Routes = [
  {
    path: '',
    component: ReloadPage,
  }
];


@NgModule({
  declarations: [ReloadPage ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
    
    
})
export class ReloadModule {}
