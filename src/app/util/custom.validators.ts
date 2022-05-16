import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';

import { isBefore } from 'date-fns';

export function isLess(): ValidatorFn {  
    return (control: AbstractControl): { [key: string]: any } | null =>  {
        var fecha =new Date(control.value?.toDateString());
        var today =new Date(new Date().toDateString());
         
        return isBefore(fecha, today)
        ?  {wrongDate: control.value} : null;
    }
        
}


export class CustomValidator{
    static isLess(control:FormControl){

        if(!control.value) return null;

        var fecha =new Date(control.value?.toDateString());
        var today =new Date(new Date().toDateString());
        if(isBefore(fecha, today))
            return {    IsLessToday:true };
        return null;
    }
}