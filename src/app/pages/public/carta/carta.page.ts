import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.servies';
import { DataServiceItemCarta } from '../../privado/carta/data-service/data.service.item-carta';
import { ItemCartaModel } from '../../privado/carta/models/item-carta.model';
import { CartaService } from '../../privado/carta/servicios/carta.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.page.html',
  styleUrls: ['./carta.page.scss'],
})
export class CartaPage implements OnInit {

  lstItemOpcionesCarta = this.cartaService.lstItemOpcionesCarta.filter(a=> a.carta);

  isloading: boolean = false;

  lstItemCarta : ItemCartaModel[] = [];
  constructor(
    private router: Router,
    private shareService: ShareService,
    private cartaService: CartaService,
    private dataServiceItemCarta: DataServiceItemCarta,
  ) { }

  ngOnInit() {
  }



  getItemsCarta(itemOpcion){
    this.isloading = true;
    this.dataServiceItemCarta.getItemCarta(itemOpcion.key).then(lst =>{
      this.isloading = false;

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
