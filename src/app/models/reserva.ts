export class Reserva{
  id : string;  
  servicio : string;  //comida / cena
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


  constructor(){
   this.dia=0;
   this.mercado=0;
   this.degustacion=0;
   this.cochinillo=0;
 
   this.ninos=0;
   this.boda=0;
   this.comunion=0;
   this.bautizo=0;
  }

  // getAdultos():number{
  //   return  this.dia +  this.mercado +  this.degustacion +  this.cochinillo;
  // }

  //  get Adultos():number{
  //   return  this.dia +  this.mercado +  this.degustacion +  this.cochinillo;
  // }

}

export class Reserva_audit{
  IdReserva : string;
  cuando : any;
  quien : string;
  operacion : string;  // A, M, B
}

export class Totales {
  mesas : 0;
  dia : number;
  mercado : number;
  degustacion : number;
  cochinillo: number;
  ninos : number;
  boda: number;
  comunion : number;
  bautizo : number;
 constructor(){
   this.mesas = 0;
  this.dia=0;
  this.mercado=0;
  this.degustacion=0;
  this.cochinillo=0;

  this.ninos=0;
  this.boda=0;
  this.comunion=0;
  this.bautizo=0;
 }

  get Adultos():number{
   return  this.dia +    this.mercado +    this.degustacion +    this.cochinillo;
 }

}

