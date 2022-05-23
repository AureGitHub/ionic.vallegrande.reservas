import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncargoUpdatePage } from './encargo-update.page';


const routes: Routes = [
  {
    path: '',
    component: EncargoUpdatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncargoUpdatePageRoutingModule {}
