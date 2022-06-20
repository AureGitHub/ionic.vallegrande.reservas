import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShareService {


  changedTitleMenu: Subject<any> = new Subject();


public icon = {
  
  add: 'add-circle-outline',
  save : 'save-outline',
  cancel : 'close-circle-outline',
  borrar:  'trash-outline',
  warning : 'warning-outline',
  mesa: 'restaurant-outline',
  comida: 'sunny-outline',
  cena: 'moon-outline',
  herramientas: 'construct-outline',
  information: 'megaphone-outline',
  information_i: 'information-outline',
  baja_user : 'thumbs-down-outline',
  alta_user : 'thumbs-up-outline',
  encargo : 'alarm-outline',

  };


  public operacion_audit = {  
    alta: 'A',
    modificacion: 'M',
    borrado: 'B'    
    };




}
