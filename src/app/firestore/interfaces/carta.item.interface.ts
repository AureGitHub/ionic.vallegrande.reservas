import Base from "./base.interface";

export default interface CartaItemI extends Base {
    key: string;  
    titulo: string;  
    descripcion: string;  
    disponible: boolean;
    motivoprecio? : string;
    precio: number;
  
    motivoprecio1? : string;
    precio1?: number;
}