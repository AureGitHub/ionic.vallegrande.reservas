import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home/home.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reserva/reserva.module').then(m => m.ReservaModule),
  },
  {
    path: 'resumen',
    loadChildren: () => import('./resumen/resumen.module').then(m => m.ResumenModule),
  },


  {
    path: 'empleados',
    loadChildren: () => import('./empleados/empleados.module').then(m => m.EmpleadosModule),
  },

  {
    path: 'tareas',
    loadChildren: () => import('./tarea/tarea.module').then(m => m.TareaModule),
  },

  {
    path: 'carta',
    loadChildren: () => import('./carta/carta.module').then(m => m.CartaModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivadoRoutingModule {}
