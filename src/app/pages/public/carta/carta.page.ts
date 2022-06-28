import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
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


  selectedOptionCarta: any;


  lstItemOpcionesCarta = this.cartaService.lstItemOpcionesCarta.filter(a=> a.carta);

  isloading: boolean = false;

  lstItemCarta : any = null;
  constructor(
    private cartaService: CartaService,
    private dataServiceItemCarta: DataServiceItemCarta,
     private shareService: ShareService,
  ) { 

    
  }

  ngOnInit() {
    this.shareService.changedTitleMenu.next('Complejo VALLE GRANDE');

    this.ObtenerItemCarta();

   
  }


  ObtenerItemCarta(){
    this.isloading = true;
    this.lstItemCarta = {};

    this.lstItemOpcionesCarta.forEach(itemOpcion=>{

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
        this.lstItemCarta[itemOpcion.key] = lst.filter(a=> a.disponible);  
      });      
    });   
  }


  selectOptionCarta(index){
    if(index == this.selectedOptionCarta ){
      this.selectedOptionCarta = null;
    }
    else{
      this.selectedOptionCarta = index;
    }
    
  }

}
