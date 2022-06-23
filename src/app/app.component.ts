import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AlertController, Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ShareService } from './services/share.servies';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  Pages: any[];  
  name: string = '';
  isAdmin: boolean;

  titleOption : string ='';

  user : any;

  constructor(

    private menuController: MenuController,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,

    private authService: AuthService,
    public alertController: AlertController,
    private router: Router,
    private shareService: ShareService

  ) {


    this.shareService.changedTitleMenu.subscribe(title => {
      this.titleOption = title

    });

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

    this.ForzarReloadWhenDeploy();
    
  }


  ForzarReloadWhenDeploy(){
    const version = JSON.parse(localStorage.getItem('version'));

    if(!version || version!= environment.version){
      localStorage.setItem('version', JSON.stringify(environment.version));
      window.location.reload();

    }




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

            var req = indexedDB.deleteDatabase('firebaseLocalStorageDb');      
            
            req.onsuccess = function () {
              console.log("Deleted database successfully");
          };
          req.onerror = function () {
              console.log("Couldn't delete database");
          };
          req.onblocked = function () {
              console.log("Couldn't delete database due to the operation being blocked");
          };

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
        title : 'Inicio',
        url   : '/privado',
        icon  : 'storefront' 
        }, 
      { 
       
        perfil : 'all',
        title : 'Reservas',
        url   : '/privado/reservas',
        icon  : 'calendar' 
        }, 

        { 
       
          perfil : 'all',
          title : 'Encargos',
          url   : '/privado/reservas',
          icon  : 'calendar' 
          }, 

          { 
            perfil : 'all',
            title : 'Modificar Carta',
            url   : '/privado/carta',
            icon  : 'clipboard' 
            },

        { 
        perfil : 'all',
        title : 'Resumen',
        url   : '/privado/resumen',
        icon  : 'restaurant' 
        },
      { 
        perfil : 'all',
        title : 'Tareas',  
        url   : '/privado/tareas',  
        icon  : 'document-text'  
      },   
      {  
        perfil : 'A',
        title : 'Empleados',  
        url   : '/privado/empleados',  
        icon  : 'people'   
      },  
       {  
        perfil : 'all',
        title : 'VIPs',  
        url   : '/home',  
        icon  : 'beer'   
      },  
      {  
        title : 'público',  
        url   : '/public',  
        icon  : 'accessibility'   
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
