import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isAdmin : boolean = false;
  nombre : string = 'usuario';
  constructor(
    private authService: AuthService

  ) {
    this.isAdmin = this.authService.isAdmin;
    this.nombre =this.authService.email ? this.authService.email.split('@')[0] : 'usuario';
  }

}
