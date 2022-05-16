import { Injectable } from '@angular/core';


@Injectable()
export class LanguageService {


    FirstDayWeek = {
        ES : 1,
        EN : 0,
    }

    today = {
        ES : {des : 'Hoy'},
        EN : {des : 'Today'},
    }


    daysName = {
        ES : [
            {id : 1 , des :'Lunes', cor : 'Lu'},
            {id : 2 , des :'Martes', cor : 'Ma'},
            {id : 3 , des :'Miércoles', cor : 'Mi'},
            {id : 4 , des :'Jueves', cor : 'Ju'},
            {id : 5 , des :'Viernes', cor : 'Vi'},
            {id : 6 , des :'Sábado', cor : 'Sa'},
            {id : 0 , des :'Domingo', cor : 'Do'},
        ],
        EN:[
            {id : 0 , des :'Sunday', cor : 'Su'},
            {id : 1 , des :'Monday', cor : 'Mo'},
            {id : 2 , des :'Tuesday', cor : 'Tu'},
            {id : 3 , des :'Wednesday', cor : 'We'},
            {id : 4 , des :'Thursday', cor : 'Th'},
            {id : 5 , des :'Friday', cor : 'Fr'},
            {id : 6 , des :'Saturday', cor : 'Sa'},
            
        ]
    }


    MonthsName = {
        ES : [
            {id : 0 , des :'Enero'},
            {id : 1 , des :'Febrero'},
            {id : 2 , des :'Marzo'},
            {id : 3 , des :'Abril'},
            {id : 4 , des :'Mayo'},
            {id : 5 , des :'Junio'},
            {id : 6 , des :'Julio'},
            {id : 7 , des :'Agosto'},
            {id : 8 , des :'Septiembre'},
            {id : 9 , des :'Octubre'},
            {id : 10 , des :'Noviembre'},
            {id : 11 , des :'Diciembre'},
           
        ],
        EN:[
            {id : 0 , des :'January'},
            {id : 1 , des :'February'},
            {id : 2 , des :'March'},
            {id : 3 , des :'April'},
            {id : 4 , des :'May'},
            {id : 5 , des :'June'},
            {id : 6 , des :'July'},
            {id : 7 , des :'August'},
            {id : 8 , des :'September'},
            {id : 9 , des :'October'},
            {id : 10 , des :'November'},
            {id : 11 , des :'December'},
        ]
    }



    constructor(
    ) {

  }

  

}