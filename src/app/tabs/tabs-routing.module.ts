import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'reserva',
        loadChildren: () => import('./reserva/reserva.module').then(m => m.ReservaPageModule)
      },
      {
        path: 'resumen',
        loadChildren: () => import('./resumen/resumen.module').then(m => m.ResumenModule)
      },

      {
        path: 'tarea',
        loadChildren: () => import('./tarea/tarea.module').then(m => m.TareaModule)
      },

      {
        path: 'reserva-update',
        loadChildren: () => import('./reserva-update/reserva-update.module').then(m => m.ReservaUpdatePageModule)
      },
            {
        path: 'encargo-update',
        loadChildren: () => import('./encargo-update/encargo-update.module').then(m => m.EncargoUpdatePageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule)
      },
      {
        path: 'logout',
        loadChildren: () => import('./logout/logout.module').then(m => m.LogoutPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/reserva',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
