import { Injectable } from '@angular/core';

@Injectable()
export class CartaService {

    lstItemOpcionesCarta = [
        {title : 'Primeros Platos', key : 'primerosplatos', sinPrecio : true, carta : false},
        {title : 'Segundos Platos', key : 'segundosplatos', sinPrecio : true, carta : false},
        {title : 'Menus', key : 'menus', carta : true},
        {title : 'Para Compartir', key : 'paracompartir', carta : true},
        {title : 'Raciones', key : 'raciones', carta : true},
        {title : 'Ensaladas', key : 'ensaladas', carta : true},
        {title : 'Pizzas', key : 'pizzas', carta : true},
        {title : 'Bocadillos', key : 'bocadillos', carta : true},
        {title : 'Hamburguesas', key : 'hamburguesas', carta : true},
    
      ];

}