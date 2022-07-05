import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RolGuard } from './guard/rol.guard';

const routes: Routes = [
  {
    path: 'reload',
    loadChildren: () => import('./pages/reload/reload.module').then( m => m.ReloadModule)
  },
   {
    path: '',
    loadChildren: () => import('./pages/reload/reload.module').then( m => m.ReloadModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },

  {
    path: 'privado',
    loadChildren: () => import('./pages/privado/privado-routing.module').then( m => m.PrivadoRoutingModule), canActivate: [RolGuard]
  },

  {
    path: 'public',
    loadChildren: () => import('./pages/public/public-routing.module').then( m => m.PublicRoutingModule)
  },
 
];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
