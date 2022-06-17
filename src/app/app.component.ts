import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AlertController, Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  Pages: any[];  
  name: string = '';
  isAdmin: boolean;

  user : any;

  constructor(

    private menuController: MenuController,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,

    private authService: AuthService,
    public alertController: AlertController,
    private router: Router,

  ) {

    this.initializeApp();

   

    this.authService.changedStateUser.subscribe(user => {
     
      this.user = user;

      this.name = !user ? '' : '(' +  user.email.split('@')[0] + ')';
      this.sideMenu(); 

    })


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {
    
  }

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
            this.menuController.close();
          }
          );
        },
      },],
    });

    await alert.present();



   
   
  }



  sideMenu() {  


    this.Pages =[];

    var lstOptions=    
    [ 
     
      { 
       
        perfil : 'all',
        title : 'Reservas',
        url   : '/reservas',
        icon  : 'calendar' 
        }, 

        { 
        perfil : 'all',
        title : 'Resumen',
        url   : '/resumen',
        icon  : 'restaurant' 
        },
      { 
        perfil : 'all',
        title : 'Tareas',  
        url   : '/tareas',  
        icon  : 'document-text'  
      },   
      {  
        perfil : 'A',
        title : 'Usuarios',  
        url   : '/usuarios',  
        icon  : 'people'   
      },  
     
    ];  

    lstOptions.forEach(item => {
      if(item.perfil){
        // requiere perfil (Estar conectado)
        if(this.user){
          if(item.perfil == 'all'){
            this.Pages.push(item);
          }
          else{
            if(this.user.perfil == item.perfil){
              this.Pages.push(item);
            }
          }
        }
      }
      else{
        // Público. Todos lo ve
        this.Pages.push(item);
      }

    });
  }  
}
