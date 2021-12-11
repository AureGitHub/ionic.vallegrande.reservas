import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.page.html',
  styleUrls: ['logout.page.scss']
})
export class LogoutPage {

  constructor( 
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController
    ) {}
 
  async logout() {


    const alert = await this.alertController.create({
      header: '¿Salir de la aplicación?',
      message: 'Va a salir de la aplicación',
      buttons: [ {
        text: 'Cancelar',
        role: 'Cancelar',
        cssClass: 'secondary',
      },
      {
        text: 'Salir',
        handler: () => {
          this.authService.logout().then(data => {
            this.router.navigateByUrl('/', { replaceUrl: true });
          }
          );
        },
      },],
    });

    await alert.present();



   
   
  }

}
