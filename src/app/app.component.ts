import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AlertController, Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ShareService } from './services/share.servies';
import { environment } from '../environments/environment';
import { BaseService } from './firestore/services/base.service';
import { CartaService } from './pages/privado/carta/servicios/carta.service';
import { CartaItemService } from './firestore/services/carta.item.service';
import { CartaOptionService } from './firestore/services/carta.option.service';
import CartaOptionI from './firestore/interfaces/carta.option.interface';
import CartaItemI from './firestore/interfaces/carta.item.interface';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  Pages: any[];
  name: string = '';
  isAdmin: boolean;

  titleOption: string = '';

  user: any;
  lstItemOpcionesCarta: CartaOptionI[];

  lstCartaItem : CartaItemI[];

  constructor(

    private menuController: MenuController,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,

    private authService: AuthService,
    public alertController: AlertController,
    private router: Router,
    private shareService: ShareService,

    private cartaOptionService: CartaOptionService,
    private cartaItemService: CartaItemService,
    

  ) {


    this.shareService.changedTitleMenu.subscribe(title => {
      this.titleOption = title

    });

    this.initializeApp();



    this.authService.changedStateUser.subscribe(user => {

      this.user = user;

      this.name = !user ? '' : '(' + user.email.split('@')[0] + ')';
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

    // this.setOptioncarta();

   // await this.setItemcarta();

    this.lstCartaItem = await this.cartaItemService.getAllByKey('bocadillos');

   


  }


  ForzarReloadWhenDeploy() {
    const version = JSON.parse(localStorage.getItem('version'));

    if (!version || version != environment.version) {
      localStorage.setItem('version', JSON.stringify(environment.version));
      window.location.reload();

    }




  }

  async logout() {


    const alert = await this.alertController.create({
      header: '¿Salir de la aplicación?',
      message: 'Va a salir de la aplicación',
      buttons: [{
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


    this.Pages = [];

    var lstOptions =
      [

        {

          perfil: 'all',
          title: 'Inicio',
          url: '/privado',
          icon: 'storefront'
        },
        {

          perfil: 'all',
          title: 'Reservas',
          url: '/privado/reservas',
          icon: 'calendar'
        },

        {

          perfil: 'all',
          title: 'Encargos',
          url: '/privado/reservas',
          icon: 'calendar'
        },


        {

          perfil: 'all',
          title: 'Gestión Comandas',
          url: '/privado/comandas',
          icon: 'pencil'
        },

        {
          perfil: 'A',
          title: 'Modificar Carta',
          url: '/privado/carta',
          icon: 'clipboard'
        },

        {
          perfil: 'all',
          title: 'Resumen',
          url: '/privado/resumen',
          icon: 'restaurant'
        },
        {
          perfil: 'all',
          title: 'Tareas',
          url: '/privado/tareas',
          icon: 'document-text'
        },
        {
          perfil: 'A',
          title: 'Empleados',
          url: '/privado/empleados',
          icon: 'people'
        },
        {
          perfil: 'all',
          title: 'VIPs',
          url: '/home',
          icon: 'beer'
        },
        {
          title: 'público',
          url: '/public',
          icon: 'accessibility'
        },
        {
          title: 'atualizar',
          url: '/reload',
          icon: 'refresh'
        },

      ];

    lstOptions.forEach(item => {
      if (item.perfil) {
        // requiere perfil (Estar conectado)
        if (this.user) {
          if (item.perfil == 'all') {
            this.Pages.push(item);
          }
          else {
            if (this.user.perfil == item.perfil) {
              this.Pages.push(item);
            }
          }
        }
      }
      else {
        // Público. Todos lo ve
        this.Pages.push(item);
      }

    });
  }

  setOptioncarta(){

    var lstItemOpcionesCarta = [
      {title : 'Primeros Platos', key : 'primerosplatos', sinPrecio : true, carta : false},
      {title : 'Segundos Platos', key : 'segundosplatos', sinPrecio : true, carta : false},
      {title : 'Menus', key : 'menus', carta : true},
      {title : 'Para Compartir', key : 'paracompartir', carta : true},
      {title : 'Raciones', key : 'raciones', carta : true},
      {title : 'Ensaladas', key : 'ensaladas', carta : true},
      {title : 'Pizzas', key : 'pizzas', carta : true},
      {title : 'Bocadillos', key : 'bocadillos', carta : true},
      {title : 'Hamburguesas', key : 'hamburguesas', carta : true},
  
    ];

    lstItemOpcionesCarta.forEach(item =>{
      this.cartaOptionService.add<CartaOptionI>(item);
    });

  }


  async setItemcarta(){


    // var promesa = this.cartaOptionService.getAll<CartaOptionI>().pipe().toPromise();

    // promesa.then(data=> {
    //   console.log(data)
    // });

    // this.lstItemOpcionesCarta = await promesa;
    // var a=10;

    //return;

    this.cartaOptionService.getAll<CartaOptionI>().subscribe(data => {      
      this.lstItemOpcionesCarta =  data;

      this.lstItemOpcionesCarta.forEach(async cartaOption => {
        const lstItemCarta = await this.cartaOptionService.getItemBycollectionName<CartaItemI>(cartaOption.key);

        lstItemCarta.forEach(async cartaItem=>{
          cartaItem.key = cartaOption.key;
          await this.cartaItemService.add<CartaItemI>(cartaItem);

        });

        var a='';
      })


      

    });

  }

}
