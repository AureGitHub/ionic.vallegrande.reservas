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

  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  indexSelected : any;

 //Coverflow
 slideOptions = {
  initialSlide: 2,
  slidesPerView: 3,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
};

  lstItemOpcionesCarta = this.cartaService.lstItemOpcionesCarta.filter(a=> a.carta);

  isloading: boolean = false;

  lstItemCarta : ItemCartaModel[] = [];
  constructor(
    private cartaService: CartaService,
    private dataServiceItemCarta: DataServiceItemCarta,
     private shareService: ShareService,
  ) { 

    
  }

  ngOnInit() {
    this.shareService.changedTitleMenu.next('Complejo VALLE GRANDE');
   
  }
  

  swipePrev(){
    this.slideWithNav.slidePrev();
  }

  swipeNext(){
    this.slideWithNav.slideNext();
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange() {
    this.slideWithNav.getActiveIndex().then(index => {
      this.getItemsCarta(this.lstItemOpcionesCarta[index]);
      this.indexSelected = index;
   });;
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
