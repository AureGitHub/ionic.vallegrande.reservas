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
    component: LoginPage,
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [RolGuard]
  },
 
];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
