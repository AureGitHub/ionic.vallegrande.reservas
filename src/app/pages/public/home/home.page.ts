import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.servies';
import { DataServiceItemCarta } from '../../privado/carta/data-service/data.service.item-carta';
import { ItemCartaModel } from '../../privado/carta/models/item-carta.model';
import { CartaService } from '../../privado/carta/servicios/carta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  lstItemOpcionesCarta = this.cartaService.lstItemOpcionesCarta.filter(a=> a.carta);

  lstItemCarta : ItemCartaModel[] = [];
  constructor(
    private shareService: ShareService,
    private cartaService: CartaService,
    private dataServiceItemCarta: DataServiceItemCarta,
  ) { }

  ngOnInit() {
    this.shareService.changedTitleMenu.next('Complejo VALLE GRANDE');

  }



  getItemsCarta(itemOpcion){
    this.dataServiceItemCarta.getItemCarta(itemOpcion.key).then(lst =>{

      lst.forEach(item => {
        item['mostarTituloPrecio'] = item.titulo + (item.motivoprecio ? ' (' + item.motivoprecio + ')' : '');

        if(item.motivoprecio1){

          var tmp = '';
          tmp=tmp.padStart(item.titulo.length+6,'\xa0');
          tmp+='(' + item.motivoprecio1 + ')';


          item['mostarTituloPrecio1'] =tmp;

        }


      });
      this.lstItemCarta = lst.filter(a=> a.disponible);

    });
  }

}
