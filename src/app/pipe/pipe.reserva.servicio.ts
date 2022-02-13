import { Pipe, PipeTransform } from "@angular/core";
import { ReservaModel } from "../services/bd/models/reserva.model";

@Pipe({
    name: 'myfilter',
    pure: false
  })
  export class MyFilterPipe implements PipeTransform {
    transform(items: ReservaModel[], filter: ReservaModel): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.servicio ==filter.servicio);
    }
  }