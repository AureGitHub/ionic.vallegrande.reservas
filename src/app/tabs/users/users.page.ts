import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/services/bd/models/user.model';
import { ShareService } from 'src/app/services/share.servies';

@Component({
  selector: 'app-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss']
})
export class UsersPage  implements OnInit {

  formGroup: FormGroup;
  loadingSubmit: boolean;

  users : UserModel[];

  validation_messages = {
    'nombre': [
      { type: 'required', message: 'El nombre es obligatoria.' },
      { type: 'minlength', message: 'El nombre debe ser mayor de 3 caracteres.' }
    ],
    'contrasena': [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe ser mayor de 6 caracteres.' }
    ]
  };

  icon : any;

  constructor( 
    private authService: AuthService,
    private router: Router,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private shareService : ShareService
    ) {
     this.icon = this.shareService.icon;
    }
 
    ngOnInit(): void {

     
      this.actualizaLista();
      this.formGroup = this.formBuilder.group({
       
     
        nombre: new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(3)
        ])),
        contrasena: new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(6)
        ])),
           
      });

      this.formGroup.controls['nombre'].setValue('');
      this.formGroup.controls['contrasena'].setValue('');
    }

    actualizaLista(){
      this.authService.getUsers().then(data => {
        this.users = data;
       });
    }

  crear(){
  
  }

  async cambiarEstado(user,newEstado){

    const alert = await this.alertController.create({
      header: '¿Desea cambiar el estado del usuario?',
      message: 'El usuario se va a dar de ' + (newEstado == 'B' ? 'BAJA' : 'ALTA'),
      buttons: [ {
        text: 'No',
        role: 'Cancelar',
        cssClass: 'secondary',
      },
      {
        text: 'Si',
        handler: () => {
          user['perfil']=newEstado;
          this.authService.cambiarEstado(user,newEstado).then(
            () => { this.actualizaLista();},
            error => {console.log(error)}
           
           )
        },
      },],
    });

    await alert.present();
    
  }

  submit(){
    if(this.formGroup.valid){
      this.loadingSubmit = true;

      this.authService.create(this.formGroup.value.nombre +'@vallegrande.es',
        this.formGroup.value.contrasena ,'C')
      .then(
        () =>{
          this.loadingSubmit = false;
          this.actualizaLista();
          alert('creado correctamente');

        },
        error =>{
          this.loadingSubmit = false;
          alert(error);
        } 
        );

    //  this.dataService.management(this.formGroup.value)
    //  .then(
    //    (data)=>{
    //      this.volver()
    //    },        
    //    error => {
    //      this.loadingSubmit = false;
    //    }
     
    //  );

     //si guardado OK
      

    }
   }

}
