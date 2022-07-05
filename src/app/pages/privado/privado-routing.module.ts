import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolGuard } from 'src/app/guard/rol.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
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
    loadChildren: () => import('./empleados/empleados.module').then(m => m.EmpleadosModule), canActivate: [RolGuard],  data: {Rol: ['A'] }
  },

  {
    path: 'tareas',
    loadChildren: () => import('./tarea/tarea.module').then(m => m.TareaModule),
  },

  {
    path: 'carta',
    loadChildren: () => import('./carta/carta.module').then(m => m.CartaModule), canActivate: [RolGuard],  data: {Rol: ['A'] }
  },
  {
    path: 'comandas',
    loadChildren: () => import('./comandas/comandas.module').then( m => m.ComandasPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivadoRoutingModule {}
