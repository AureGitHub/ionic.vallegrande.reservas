
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class RolGuard implements CanActivate {


  constructor(
    private _router: Router,
    private authService: AuthService
    ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    // if (currentUser==-1) {
    //   this._router.navigate(['/expired']);
    //   return false;
    // }

    if (!this.authService.isAdmin) {
      this._router.navigate(['/login']);
      return false;
    }

    // if (next.data.page) {
    //   switch (next.data.page) {
    //     case 'certificado-lanzador':
    //       if (currentUser.Rol == this.enumService.enumRoles.Sociedad_Clasificacion && !currentUser.Ticket) {
    //         this._router.navigate(['/no-autorizado']);
    //       }
    //       break;
    //   }
    // }

    // //cualquiera
    // if (next.data.Rol.some(a => a === this.enumService.enumRoles.all)) {
    //   return true;
    // }

    // // rol del usuario
    // if (next.data.Rol.some(a => a === currentUser.Rol)) {
    //   return true;
    // }

    return true;
  }

}
