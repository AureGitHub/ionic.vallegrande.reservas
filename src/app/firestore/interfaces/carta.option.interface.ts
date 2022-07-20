import Base from "./base.interface";

export default interface CartaOptionI extends Base {
    key: string;  
    title: string;
    carta : boolean;
    sinPrecio?: boolean;
}


