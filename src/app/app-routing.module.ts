import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RolGuard } from './guard/rol.guard';
import { IntroPage } from './intro/intro.page';
import { LoginPage } from './pages//login/login.page';

const routes: Routes = [
  {
    path: 'intro',
    component: IntroPage,
  },
   {
    path: '',
    component: LoginPage,
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },

  {
    path: 'privado',
    loadChildren: () => import('./pages/privado/privado-routing.module').then( m => m.PrivadoRoutingModule)
  },
 
];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
