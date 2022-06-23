import { Component, Input, OnInit } from '@angular/core';
import { CerradoModel } from 'src/app/services/bd/models/cerrado.model';
import { ShareService } from 'src/app/services/share.servies';
import { CartaService } from '../../servicios/carta.service';


@Component({
  selector: 'buscador-comanda-component',
  templateUrl: './buscador-comanda.component.html',
  styleUrls: ['./buscador-comanda.component.css']
})
export class BuscadorComandaComponent  implements OnInit {

  isModalOpen : boolean = false;
  lstItemOpcionesCarta = this.cartaService.lstItemOpcionesCarta;

  constructor(
    private shareService : ShareService,
    private cartaService: CartaService,

   ) {
    }

  ngOnInit() {

  }

  verItems(itemOpcion){
    alert(itemOpcion.key);
  }
   
}
