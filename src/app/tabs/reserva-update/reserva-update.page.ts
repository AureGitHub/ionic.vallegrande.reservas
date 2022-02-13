import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataServiceReserva } from 'src/app/services/bd/dataservice/data.service.reserva';
import { CerradoModel } from 'src/app/services/bd/models/cerrado.model';
import { ReservaModel } from 'src/app/services/bd/models/reserva.model';


@Component({
  selector: 'reserva-update',
  templateUrl: 'reserva-update.page.html',
  styleUrls: ['reserva-update.page.scss']
})


export class ReservaUpdatePage implements OnInit {

  servicio : string ='aure;' 
  copiarAwhatsapp: string;

  comidaCerrada : CerradoModel;
  cenaCerrada : CerradoModel;
  
  formGroup: FormGroup;
  errorMessage: string = '';

  loadingSubmit: boolean;
  loadingBorrar: boolean;


   reserva: ReservaModel;


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
      { type: 'minlength', message: 'El nombre debe ser mayor de 3 caracteres.' }
    ]
  };



  checkComida: boolean =false;
  checkCena: boolean =false;

  selectedTime : Date;

  isUpdate: boolean =false;
 

    constructor(
      private route: ActivatedRoute, private router: Router,
      private dataServiceReserva: DataServiceReserva,
      private formBuilder: FormBuilder,
      private authService: AuthService,
      public alertController: AlertController,
     
      ) {

        this.route.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
            this.selectedTime = this.router.getCurrentNavigation().extras.state.selectedTime;
            this.reserva = this.router.getCurrentNavigation().extras.state.reserva;
            this.comidaCerrada = this.router.getCurrentNavigation().extras.state.comidaCerrada;
            this.cenaCerrada = this.router.getCurrentNavigation().extras.state.cenaCerrada;
          }
        });
  
    }

    ngOnInit(): void {
     
      this.updateForm();
    }

    volver(){
      this.router.navigateByUrl('/tabs', { replaceUrl: true })
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
          Validators.required, Validators.minLength(3)
        ])),
        telefono: new FormControl('', ),

        dia: new FormControl('', ),
        mercado: new FormControl('', ),
        degustacion: new FormControl('', ),
        cochinillo: new FormControl('', ),
        carta: new FormControl('', ),
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
      this.formGroup.controls['carta'].setValue(0);
      this.formGroup.controls['ninos'].setValue(0);
      this.formGroup.controls['boda'].setValue(0);
      this.formGroup.controls['comunion'].setValue(0);
      this.formGroup.controls['bautizo'].setValue(0);

      this.checkCena = false;
      this.checkComida = false;
    }

    updateForm() {
      // if(!this.selectedTime){
      //   this.volver();
      // }
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
        header: '¿Desea cancelar el servicio?',
        message: 'El servicio se borrará de forma permanente',
        buttons: [ {
          text: 'No',
          role: 'Cancelar',
          cssClass: 'secondary',
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.loadingBorrar = true;
            this.dataServiceReserva.borrar(this.formGroup.value)
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

      this.dataServiceReserva.management(this.formGroup.value)
      .then(
        (data)=>{
          this.volver()
        },        
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

    clickSelect($event){
      var obj=$event.target as HTMLInputElement;
      obj.select();
    }

    async clickCopy(){

      let cadena=this.formGroup.controls['fecha']?.value.toLocaleDateString() + ' - ' 
      +  this.formGroup.controls['servicio'].value + ' - ' 
      +  this.formGroup.controls['nombre'].value + ' - ' 
      +  this.formGroup.controls['telefono'].value  + ' - ' 
      +  (this.formGroup.controls['dia'].value ==0 ? '' : 'dia:' + this.formGroup.controls['dia'].value) + ' - ' 
      +  (this.formGroup.controls['mercado'].value ==0 ? '' : 'mercado:' + this.formGroup.controls['mercado'].value) + ' - ' 
      +  (this.formGroup.controls['degustacion'].value ==0 ? '' : 'degustacion:' + this.formGroup.controls['degustacion'].value) + ' - ' 
      +  (this.formGroup.controls['cochinillo'].value ==0 ? '' : 'cochinillo:' + this.formGroup.controls['cochinillo'].value) + ' - ' 
      +  (this.formGroup.controls['carta'].value ==0 ? '' : 'carta:' + this.formGroup.controls['carta'].value) + ' - ' 
      +  (this.formGroup.controls['ninos'].value ==0 ? '' : 'niños:' + this.formGroup.controls['ninos'].value) + ' - ' 
      +  (this.formGroup.controls['boda'].value ==0 ? '' : 'boda:' + this.formGroup.controls['boda'].value) + ' - ' 
      +  (this.formGroup.controls['bautizo'].value ==0 ? '' : 'bautizo:' + this.formGroup.controls['bautizo'].value) + ' - ' 
      +  (this.formGroup.controls['comunion'].value ==0 ? '' : 'comunion:' + this.formGroup.controls['comunion'].value) ;


      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(cadena);
        } catch (err) {}
      }
    }

}
