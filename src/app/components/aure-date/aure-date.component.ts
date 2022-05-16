import { Component, Input, OnInit } from '@angular/core';
import { isToday } from 'date-fns';
import { deflate } from 'zlib';
import { LanguageService } from './languaje.service';

@Component({
  selector: 'aure-date',
  templateUrl: './aure-date.component.html',
  styleUrls: ['./aure-date.component.scss'],
})
export class AureDateComponent implements OnInit {

  @Input()  lan : string;



  // Fecha seleccionada
  dateSelected : Date = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());

  // Fecha que utilizo para hacer el calendario (DIFERENTE A LA SELECCIOANDA)
  dateParaMontarCalendar  : Date = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());

  today = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());

  

  //Lista de meses para el combo
  months = [];
  // Lista de años para el combo
  Years = [];


  //Mes actual. En número. indexado a partir del 0
  currentMonth : number = new Date().getMonth();
  
  //Año actual. En número
  currentYear : number = new Date().getFullYear();
  
  // Lista de objetos que contienen los días del mes
  lstDiasMesinWeek = [];


  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.Setyears();
    this.getDiasMes();
    this.setlanguaje();

  }
  Setyears() {
    this.Years = [];
    for(var i=1930; i < new Date().getFullYear() + 10; i++){
      this.Years.push(i);
    }
  }

  selectChangedMonth(item){
    this.currentMonth = parseInt(item.detail.value);
    this.dateParaMontarCalendar.setMonth(this.currentMonth);
    this.getDiasMes();
    this.dateSelected = null;
  }


  selectChangedYear(item){
    this.currentYear = parseInt(item.detail.value);
    this.dateParaMontarCalendar.setFullYear(this.currentYear);
    this.getDiasMes();
    this.dateSelected = null;
  }

  SetToday()
  {
    this.dateParaMontarCalendar= new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());
    this.currentMonth = this.dateParaMontarCalendar.getMonth();
    this.currentYear = this.dateParaMontarCalendar.getFullYear();
    this.getDiasMes();
    this.dateSelected = null;
  }

  

  setlanguaje() {
    this.months = this.languageService.MonthsName[this.lan];
  }




  padWithZero(num, targetLength) {    
    return String(num).padStart(targetLength, '0')
  }

  FormatShortDate(date){
    if(date){
      switch(this.lan){

        case 'ES' : 
        default :
        return `${this.padWithZero(date.getDate(),2)}/${this.padWithZero((date.getMonth()+1),2)}/${date.getFullYear()}`
      }

    }
    return '-';
  }


  cambiaMes(cuanto){


  }
  getDiasMes(){
    var lstDiasMes=[];
    this.lstDiasMesinWeek=[];

    let anno = this.dateParaMontarCalendar.getFullYear();
    let month=this.dateParaMontarCalendar.getMonth() + 1;
    let diasMes =new Date(anno,month,0).getDate();

    var indicePrimerDia =  new Date(anno, month - 1, 1).getDay();

    if(indicePrimerDia==0){
      //domingo
      for(var indice=1; indice <=6; indice++){
        
        lstDiasMes.push({dia, indice});
      }
      
    }
    else{
      for(var indice=1; indice <indicePrimerDia; indice++){
        lstDiasMes.push({dia, indice});
      }
    }


    for (var dia = 1; dia <= diasMes; dia++) {
      // Ojo, hay que restarle 1 para obtener el mes correcto

      var fecha = new Date(anno, month - 1, dia);
      var indice = fecha.getDay();
      
      // indice 0 ==> Domingo
      lstDiasMes.push({fecha,dia, indice});
    }

    var lstWeek = [];
    for(var i=1; i<=lstDiasMes.length; i++){

      lstWeek.push(lstDiasMes[i-1]);
      if(i % 7 == 0){
        this.lstDiasMesinWeek.push(lstWeek);
        lstWeek=[];
      }
    }
    if(lstWeek.length > 0){
      for(var i=lstWeek.length; i< 7;i++ )
      {
        lstWeek.push({});
      }
      this.lstDiasMesinWeek.push(lstWeek);
    }
  }

  selectDay(item){
    this.dateSelected = item && item.fecha ? item.fecha : this.dateSelected;
    this.getDiasMes();
  }

}
