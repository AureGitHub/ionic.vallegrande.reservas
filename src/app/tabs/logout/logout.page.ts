import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.page.html',
  styleUrls: ['logout.page.scss']
})
export class LogoutPage {

  message:string;

  constructor( 
    private _ngZone: NgZone,
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController,
    private speechRecognition: SpeechRecognition
    ) {
      this.getPermission();
    }

    ionViewDidLoad(){
      this.getPermission();
    }

    startListening(){
      let options = {
        language: "es-ES",//fijamos el lenguage
        matches: 1,//Nos devuelve la primera opción de lo que ha escuchado
        //si ponemos otra cantidad, nos dará una variante de la palabra/frase que le hemos dicho
      }
      try{


        this.speechRecognition.startListening(options).subscribe((pharases: string[]) => {
          this._ngZone.run(() => {
            this.message = (pharases.length > 0)? pharases[0] : "";
          });
      });

        // this.speechRecognition.startListening(options).subscribe(matches=>{
        //   this.message = matches[0]; //Guarda la primera frase que ha interpretado en nuestra variable

        //   this.speechRecognition.stopListening();
    
        // })
      }
      catch(err){
        alert(err);
      }
      
    }

    getPermission(){
      //comprueba que la aplicación tiene permiso, de no ser así nos la pide
      this.speechRecognition.hasPermission().
        then((hasPermission:boolean)=>{
          if(!hasPermission){
            this.speechRecognition.requestPermission();
          }
        })
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
          }
          );
        },
      },],
    });

    await alert.present();



   
   
  }

 

}
