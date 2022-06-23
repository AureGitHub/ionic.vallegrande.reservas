import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.servies';
import { CartaService } from './servicios/carta.service';

@Component({
  selector: 'carta',
  templateUrl: './carta.page.html',
  styleUrls: ['./carta.page.scss'],
})
export class CartaPage implements OnInit {

  lstItem = this.cartaService.lstItemOpcionesCarta;

  constructor(
    private router: Router,
    private shareService: ShareService,
    private cartaService: CartaService,
    
  ) { }

  ngOnInit() {
    this.shareService.changedTitleMenu.next('Carta');

  }

  irA(url){
    this.router.navigateByUrl(url, { replaceUrl: true });
  }

}

