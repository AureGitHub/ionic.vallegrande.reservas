export class Reserva{
  tipo : string;  //comida / cena
  fecha: any;
  hora: number;
  nombre: string;
  telefono: number;

  dia : number;
  mercado: number;
  degustacion: number;
  cochinillo: number;

  ninos : number;

  boda: number;
  comunion: number;
  bautizo: number;

  observaciones: string;
  usuario: string;
}

export class Totales {
  dia : number;
  mercado : number;
  degustacion : number;
  cochinillo: number;
  ninos : number;
  boda: number;
  comunion : number;
  bautizo : number;
 constructor(){
  this.dia=0;
  this.mercado=0;
  this.degustacion=0;
  this.ninos=0;
  this.boda=0;
  this.comunion=0;
  this.bautizo=0;
  this.cochinillo=0;
 }

}

