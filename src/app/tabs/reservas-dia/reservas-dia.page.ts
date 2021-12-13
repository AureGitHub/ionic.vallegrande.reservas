import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Reserva, Totales } from '../../models/reserva';

@Component({
  selector: 'app-reservas-dia',
  templateUrl: 'reservas-dia.page.html',
  styleUrls: ['reservas-dia.page.scss']
})


export class ReservaDiaPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  selectedTime: Date;

  formGroup: FormGroup;
  errorMessage: string = '';

  loading: boolean;


  validation_messages = {
    'tipo': [
      { type: 'required', message: 'El tipo servicio  es obligatorio.' },
     
    ],
    'nombre': [
      { type: 'required', message: 'El nombre es obligatoria.' },
      { type: 'minlength', message: 'El nombre debe ser mayor de 5 caracteres.' }
    ]
  };


  servicio  = {
    comida : new  Totales(),
    cena  : new  Totales(),

  }


  


  public lstReservas: Reserva[];

    constructor(
      private route: ActivatedRoute, private router: Router,
      private dataService: DataService,
      private formBuilder: FormBuilder,
     
      ) {

        this.route.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
            this.selectedTime = this.router.getCurrentNavigation().extras.state.selectedTime;       

            this.dataService.getReservasByDate(this.selectedTime).subscribe(lst=>{
              this.resumen(lst);
              this.lstReservas = lst;
            });

          }
        });

    }

    ngOnInit(): void {

      this.formGroup = this.formBuilder.group({
        tipo: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        nombre: new FormControl('', Validators.compose([
          Validators.required
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

       
    }

    addReserva(){
      this.slides.slideNext();
    }

  resumen(lst: Reserva[]) {

    lst.forEach(reserva => {
      for (const property in this.servicio.comida) { //comida es igual que cena...mismos campos
        
        if(reserva[property]){
          this.servicio[reserva['tipo']].comida[property]+=parseInt(reserva[property]);
        }
      }
    });
  }
    

    volver(){
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
    }

    tryLogin(value){
      // this.authService.doLogin(value)
      // .then(res => {
      //   this.router.navigate(["/home"]);
      // }, err => {
      //   this.errorMessage = err.message;
      //   console.log(err)
      // })
    }

}
