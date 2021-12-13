import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RolGuard } from './guard/rol.guard';
import { IntroPage } from './intro/intro.page';
import { LoginPage } from './login/login.page';
import { ReservaDiaPage } from './tabs/reservas-dia/reservas-dia.page';

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
    path: 'reservas-dia',
    component: ReservaDiaPage,
    canActivate: [RolGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [RolGuard]
  },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
  // {
  //   path: 'contact-details/:id',
  //   loadChildren: () => import('./contact-details/contact-details.module').then(m => m.ContactDetailsPageModule)
  // },
  // {
  //   path: 'update-contact/:id',
  //   loadChildren: () => import('./update-contact/update-contact.module').then(m => m.UpdateContactPageModule)
  // }
];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
