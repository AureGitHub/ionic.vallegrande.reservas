import { Pipe, PipeTransform } from "@angular/core";
import { Reserva } from "../models/reserva";

@Pipe({
    name: 'myfilter',
    pure: false
  })
  export class MyFilterPipe implements PipeTransform {
    transform(items: Reserva[], filter: Reserva): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.servicio ==filter.servicio);
    }
  }