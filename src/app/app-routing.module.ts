import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RolGuard } from './guard/rol.guard';
import { IntroPage } from './intro/intro.page';

const routes: Routes = [
  {
    path: 'intro',
    component: IntroPage,
  },
   {
    path: '',
    loadChildren: () => import('./pages/public/public-routing.module').then( m => m.PublicRoutingModule)
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
