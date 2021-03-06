import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataServiceReserva } from 'src/app/services/bd/dataservice/data.service.reserva';
import { CerradoModel } from 'src/app/services/bd/models/cerrado.model';
import { ReservaModel } from 'src/app/services/bd/models/reserva.model';
import { ShareService } from 'src/app/services/share.servies';
import { CustomValidator, isLess } from 'src/app/util/custom.validators';

@Component({
  selector: 'encargo-update',
  templateUrl: 'encargo-update.page.html',
  styleUrls: ['encargo-update.page.scss']
})


export class EncargoUpdatePage implements OnInit {


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
      { type: 'IsLessToday', message: 'La fecha debe ser posterior a hoy.' },
     
    ],
    'hora': [
      { type: 'required', message: 'La hora es obligatoria.' },
     
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


  isUpdate: boolean =false;
  viewTitle: any;
  selectedTime: any;
 

    constructor(
      private route: ActivatedRoute, private router: Router,
      private dataServiceReserva: DataServiceReserva,
      private formBuilder: FormBuilder,
      private authService: AuthService,
      public alertController: AlertController,
      private speechRecognition: SpeechRecognition,
      private _ngZone: NgZone,
      private shareService : ShareService,
     
      ) {


        this.shareService.changedTitleMenu.next('Mod. Encargo');

        this.route.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
            this.reserva = this.router.getCurrentNavigation().extras.state.reserva;
            this.isUpdate = this.reserva!=null;
           this.selectedTime = this.router.getCurrentNavigation().extras.state.selectedTime;
            this.comidaCerrada = this.router.getCurrentNavigation().extras.state.comidaCerrada;
            this.cenaCerrada = this.router.getCurrentNavigation().extras.state.cenaCerrada;
          }
        });
  
    }


    formatDate(value: string) {
      //return format(parseISO(value), 'MMM dd yyyy');

      return new Date(value);
    }

    vocal(){
      let options = {
        language: "es-ES",//fijamos el lenguage
        matches: 1,//Nos devuelve la primera opci??n de lo que ha escuchado
        //si ponemos otra cantidad, nos dar?? una variante de la palabra/frase que le hemos dicho
      }
      try{


        this.speechRecognition.startListening(options).subscribe((pharases: string[]) => {
          this._ngZone.run(() => {
            let cadenaHablada = (pharases.length > 0)? pharases[0] : "";
          
            
            // this.GestionFrase(cadenaHablada);

           
           
            
            
          });
      });
      }
      catch(err){
        alert(err);
      }
      
    }
  // GestionFrase(cadenaHablada: string) {
  //   var lstPalabras = cadenaHablada.split(" ");

  //   if(lstPalabras.length==1 && lstPalabras[0].toUpperCase()=='GUARDAR'){
  //     this.submit();
  //   }


  //   let servicio: string = this.GetDato('SERVICIO',lstPalabras);


  //   if(servicio){

  //     if(servicio.toUpperCase() == 'COMIDA'){
  //       this.formGroup.controls['servicio'].setValue('comida');     
  //       this.checkCena = false;
  //       this.checkComida=true;
  //     }
  //     else if(servicio.toUpperCase() == 'CENA'){
  //       this.formGroup.controls['servicio'].setValue('cena');    
  //       this.checkCena = true;
  //       this.checkComida=false;
  //     }
     
  //   }


  //   let nombre: string = this.GetDato('NOMBRE',lstPalabras);
  //   if(nombre){
  //     this.formGroup.controls['nombre'].setValue(nombre);
  //   }

  //   let telf: string = this.GetDato('TEL??FONO',lstPalabras);
  //   if(telf){
  //     telf = telf.split('-').join('');
  //     telf = telf.split(' ').join('');
  //     this.formGroup.controls['telefono'].setValue(telf);
  //   }


  //   let lstPedidos = [
  //     'D??A',
  //     'MERCADO',
  //     'DEGUSTACI??N',
  //     'COCHINILLO',
  //     'CARTA',
  //     'NI??OS',
  //     'BODA',
  //     'COMUNI??N',
  //     'BAUTIZO'
  //   ];

  //   lstPedidos.forEach(pedido => {
  //     let dato: string = this.GetDato(pedido,lstPalabras);
      
  //   if(dato){    
  //     let field =  this.getFieldForm(pedido);
  //     this.formGroup.controls[field].setValue(dato);
  //   }
  //   });



  //   let obs: string = this.GetDato('OBSERVACIONES',lstPalabras);
  //   if(obs){
  //     this.formGroup.controls['observaciones'].setValue(obs);
  //   }

    
  // }
  getFieldForm(dato: string): string {
    switch(dato){
      case  'D??A': return 'dia';
      case  'MERCADO': return 'mercado';
      case  'DEGUSTACI??N': return 'degustacion';
      case  'COCHINILLO': return 'cochinillo';
      case  'CARTA': return 'carta';
      case  'NI??OS': return 'ninos';
      case  'BODA': return 'boda';
      case  'COMUNI??N': return 'comunion';
      case  'BAUTIZO': return 'bautizo';
    }
    return '';
  }
  // GetDato(key: string, lstCadena: string[]): string {

  //   let lstKeys = [
  //     'SERVICIO',
  //     'NOMBRE',
  //     'TEL??FONO',
  //     'D??A',
  //     'MERCADO',
  //     'DEGUSTACI??N',
  //     'COCHINILLO',
  //     'CARTA',
  //     'NI??OS',
  //     'BODA',
  //     'COMUNI??N',
  //     'BAUTIZO',
  //     'OBSERVACIONES'
  //   ];




  //   const isElement = (element: string) => element.toUpperCase() == key;
  //   let index = lstCadena.findIndex(isElement);
  //   if(index > -1){      
  //     let cadenaRet : string = '';
  //     index++;
  //     let noEncontadaClave: boolean = true;
  //     while(index<lstCadena.length && noEncontadaClave){
  //       let actual : string = lstCadena[index].toLocaleUpperCase();

  //       let isKey = lstKeys.find(e=> e==lstCadena[index].toLocaleUpperCase());
  //       if(isKey){
  //         noEncontadaClave = false;
  //       }
  //       else{
  //         cadenaRet+= actual + " " ; 
  //       }

  //       index++;
        


  //     }
  //     return cadenaRet.trimLeft().trimRight();
  //   }
    
  //   return null;
  // }

    getPermission(){
      //comprueba que la aplicaci??n tiene permiso, de no ser as?? nos la pide
      this.speechRecognition.hasPermission().
        then((hasPermission:boolean)=>{
          if(!hasPermission){
            this.speechRecognition.requestPermission();
          }
        })
    }


    ngOnInit(): void {
     
      this.updateForm();
    }

    volver(){
      this.router.navigateByUrl('/privado/reservas/', { replaceUrl: true })
    }


    crearForm(){
      this.formGroup = this.formBuilder.group({
        id: new FormControl('', Validators.compose([
          Validators.required
        ])),
        usuario: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        fecha: new FormControl('', Validators.compose([
          Validators.required, CustomValidator.isLess
        ])),

        hora: new FormControl('', Validators.compose([
          Validators.required
        ])),

        servicio: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        nombre: new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(3)
        ])),
        telefono: new FormControl('', ),

        observaciones: new FormControl('', ),            
      });

      this.clearForm();
    }

    clearForm(){
      if(!this.formGroup) return;
      this.formGroup.controls['servicio'].setValue('');
      this.formGroup.controls['nombre'].setValue('');
      this.formGroup.controls['telefono'].setValue('');

      this.formGroup.controls['observaciones'].setValue('');


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

      }
      else{        
        // si es null, establezco la fecha y el usuario
        this.isUpdate= false;
        this.formGroup.controls['id'].setValue('new');
        this.formGroup.controls['fecha'].setValue(this.selectedTime);
        this.formGroup.controls['usuario'].setValue(this.authService.userLogged.email);
        this.formGroup.controls['servicio'].setValue('encargo');
      }
    }


    async borrar(){
      const alert = await this.alertController.create({
        header: '??Desea cancelar el encargo?',
        message: 'El encargo se borrar?? de forma permanente',
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
     else{
       alert('Tiene que introducir todos los datos obligatorios');
     }
    }
    
  

    clickSelect($event){
      var obj=$event.target as HTMLInputElement;
      obj.select();
    }

}


