import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reserva } from 'src/app/models/reserva';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'reserva-update',
  templateUrl: 'reserva-update.page.html',
  styleUrls: ['reserva-update.page.scss']
})


export class ReservaUpdatePage implements OnInit {


  @Output() EventEmitterForm: EventEmitter<any> = new EventEmitter();

  formGroup: FormGroup;
  errorMessage: string = '';

  loading: boolean;


  @Input() set getReserva(value: Reserva) {
    this.reserva = value;
    this.updateForm();
}
  @Input() reserva: any;


  validation_messages = {
    'servicio': [
      { type: 'required', message: 'El tipo servicio  es obligatorio.' },
     
    ],
    'nombre': [
      { type: 'required', message: 'El nombre es obligatoria.' },
      { type: 'minlength', message: 'El nombre debe ser mayor de 5 caracteres.' }
    ]
  };



  checkComida =false;
  checkCena =true;


 

    constructor(
      private dataService: DataService,
      private formBuilder: FormBuilder,
     
      ) {

       
  
    }

    ngOnInit(): void {
     
      this.crearForm();
    }

    crearForm(){
      this.formGroup = this.formBuilder.group({
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
        for (const property in this.reserva) { //comida es igual que cena...mismos campos
          this.formGroup.controls[property].setValue(this.reserva[property]);
        }
      }
      else{
        this.clearForm();
      }
    }


 

    tryLogin(value){
     if(this.formGroup.valid){

       this.EventEmitterForm.emit(this.formGroup.value);

     }
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

}
