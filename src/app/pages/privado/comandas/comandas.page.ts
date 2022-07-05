import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.servies';
import { DataServiceComanda } from './data-service/data.service.comandas';
import { ComandaModel } from './models/comandas.model';

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.page.html',
  styleUrls: ['./comandas.page.scss'],
})
export class ComandasPage implements OnInit {

  lstComandas : ComandaModel[] = [];
  verCalendario: boolean = false;
  isLoading: boolean = false;

  constructor(
    private shareService : ShareService,
    private dataServiceComanda: DataServiceComanda
  ) { }

  ngOnInit() {

    this.shareService.changedTitleMenu.next('Gest. Comandas');

    this.getComandasDias();

  }



  getComandasDias(){
    this.lstComandas = [];
    this.isLoading = true;
    this.dataServiceComanda.getComandasDia('comandas').then(data => {
      this.isLoading = false;
      this.lstComandas = data;

      this.lstComandas.sort((a, b) => (a.fecha > b.fecha ? -1 : 1));
    })
  }

  padWithZero(num, targetLength) {    
    return String(num).padStart(targetLength, '0')
  }

  async getDateSelected(date: Date){
   
    // Comprobar si ya existe

    this.verCalendario = false;

    let newComandaDia = {
    fecha : date,
    titulo : `Comanda día ${this.padWithZero(date.getDate(),2)}/${this.padWithZero((date.getMonth()+1),2)}/${date.getFullYear()}`
    }

    this.dataServiceComanda.saveItemNew(newComandaDia,'comandas').then(() => {
      this.getComandasDias();

    })

  }

}
