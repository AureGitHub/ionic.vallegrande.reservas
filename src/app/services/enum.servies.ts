import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnumService {

public enumTipo = {
    comida : 'comida',
    cena : 'cena',
  };

}