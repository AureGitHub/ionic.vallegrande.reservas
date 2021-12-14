import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaUpdatePage } from './reserva-update.page';


const routes: Routes = [
  {
    path: '',
    component: ReservaUpdatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaUpdatePageRoutingModule {}
