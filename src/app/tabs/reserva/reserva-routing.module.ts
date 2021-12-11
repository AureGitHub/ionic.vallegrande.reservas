import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaPage } from './reserva.page';


const routes: Routes = [
  {
    path: '',
    component: ReservaPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaPageRoutingModule {}
