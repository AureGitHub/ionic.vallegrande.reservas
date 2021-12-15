import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Reserva } from 'src/app/models/reserva';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'reserva-update',
  templateUrl: 'reserva-update.page.html',
  styleUrls: ['reserva-update.page.scss']
})


export class ReservaUpdatePage implements OnInit {

  formGroup: FormGroup;
  errorMessage: string = '';

  loadingSubmit: boolean;
  loadingBorrar: boolean;


   reserva: Reserva;


  validation_messages = {
    'id': [
      { type: 'required', message: 'La clave es obligatoria.' },
     
    ],
    'usuario': [
      { type: 'required', message: 'El usuario es obligatorio.' },
     
    ],
    'fecha': [
      { type: 'required', message: 'La fecha es obligatoria.' },
     
    ],
    'servicio': [
      { type: 'required', message: 'El tipo servicio  es obligatorio.' },
     
    ],
    'nombre': [
      { type: 'required', message: 'El nombre es obligatoria.' },
      { type: 'minlength', message: 'El nombre debe ser mayor de 5 caracteres.' }
    ]
  };



  checkComida: boolean =false;
  checkCena: boolean =false;

  selectedTime : Date;

  isUpdate: boolean =false;
 

    constructor(
      private route: ActivatedRoute, private router: Router,
      private dataService: DataService,
      private formBuilder: FormBuilder,
      private authService: AuthService,
      public alertController: AlertController
     
      ) {

        this.route.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
            this.selectedTime = this.router.getCurrentNavigation().extras.state.selectedTime;
            this.reserva = this.router.getCurrentNavigation().extras.state.reserva;
          }
        });
  
    }

    ngOnInit(): void {
     
      this.updateForm();
    }

    volver(){
      this.router.navigateByUrl('/tabs', { replaceUrl: true })
    }

    public SetFormData(data) {
      this.reserva = data;
    this.updateForm();
    }

    crearForm(){
      this.formGroup = this.formBuilder.group({
        id: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        usuario: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        fecha: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        servicio: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        nombre: new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(5)
        ])),
        telefono: new FormControl('', ),

        dia: new FormControl('', ),
        mercado: new FormControl('', ),
        degustacion: new FormControl('', ),
        cochinillo: new FormControl('', ),
        ninos: new FormControl('', ),
        boda: new FormControl('', ),
        comunion: new FormControl('', ),
        bautizo: new FormControl('', ),

        observaciones: new FormControl('', ),            
      });

      this.clearForm();
    }

    clearForm(){
      if(!this.formGroup) return;
      this.formGroup.controls['servicio'].setValue('');
      this.formGroup.controls['nombre'].setValue('');
      this.formGroup.controls['telefono'].setValue('');

      this.formGroup.controls['dia'].setValue(0);
      this.formGroup.controls['mercado'].setValue(0);
      this.formGroup.controls['degustacion'].setValue(0);
      this.formGroup.controls['cochinillo'].setValue(0);
      this.formGroup.controls['ninos'].setValue(0);
      this.formGroup.controls['boda'].setValue(0);
      this.formGroup.controls['comunion'].setValue(0);
      this.formGroup.controls['bautizo'].setValue(0);
    }

    updateForm() {
      this.crearForm();
      if(this.reserva){
        this.isUpdate= true;
        for (const property in this.reserva) { //comida es igual que cena...mismos campos

          switch(property){
            case 'Adultos':
              //nada
              break;
            case 'fecha':
              this.formGroup.controls[property].setValue(this.reserva[property].toDate());
              break;              
            default :
              this.formGroup.controls[property].setValue(this.reserva[property]);
              break;
          }
          
        }

        this.checkComida = this.formGroup.controls['servicio'].value == 'comida';
        this.checkCena = this.formGroup.controls['servicio'].value == 'cena';

        this.selectedTime = this.formGroup.controls['fecha'].value;

      }
      else{        
        // si es null, establezco la fecha y el usuario
        this.isUpdate= false;
        this.formGroup.controls['id'].setValue('new');
        this.formGroup.controls['fecha'].setValue(this.selectedTime);
        this.formGroup.controls['usuario'].setValue(this.authService.userLogged.email);
      }
    }


    async borrar(){
      const alert = await this.alertController.create({
        header: '¿Desea borrar el servicio?',
        message: 'El servicio se borrará de forma permanente',
        buttons: [ {
          text: 'Cancelar',
          role: 'Cancelar',
          cssClass: 'secondary',
        },
        {
          text: 'Borrar',
          handler: () => {
            this.loadingBorrar = true;
            this.dataService.borrar(this.formGroup.value.id)
            .then(
              ()=>this.volver(),
              error => {
                this.loadingBorrar = false;
              }
            
            );
          },
        },],
      });
  
      await alert.present();
    }

    submit(){
     if(this.formGroup.valid){
       this.loadingSubmit = true;

      this.dataService.management(this.formGroup.value)
      .then(
        ()=>this.volver(),
        error => {
          this.loadingSubmit = false;
        }
      
      );

      //si guardado OK
       

     }
    }
    

    clickComida(){
      if(this.checkComida){
        this.checkComida = false;
        this.checkCena = true;
      }
      else{
        this.checkComida = true;
        this.checkCena = false;
      }

      let value = this.checkComida ? 'comida' : 'cena';

      this.formGroup.controls['servicio'].setValue(value);
    }


    clickCena(){
      if(this.checkCena){
        this.checkCena = false;
        this.checkComida = true;               
      }
      else{
        this.checkCena = true;
        this.checkComida = false;
        
      }

      let value = this.checkComida ? 'comida' : 'cena';

      this.formGroup.controls['servicio'].setValue(value);
    }


    checkServicio(servicio){
      if(servicio == 'comida'){
        if(this.checkComida){
          this.checkCena = false;
          this.formGroup.controls['servicio'].setValue('comida');
        }
        else{
          this.checkCena = true;
          this.formGroup.controls['servicio'].setValue('cena');
        }
      }
      else  if(servicio == 'cena'){
        if(this.checkCena){
          this.checkComida = false;
          this.formGroup.controls['servicio'].setValue('cena');
        }
        else{
          this.checkComida = true;
          this.formGroup.controls['servicio'].setValue('comida');
        }
      }
      

    }

    clickSelect($event){
      var obj=$event.target as HTMLInputElement;
      obj.select();
    }

}
