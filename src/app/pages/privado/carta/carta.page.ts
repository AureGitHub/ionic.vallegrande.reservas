import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.servies';

@Component({
  selector: 'carta',
  templateUrl: './carta.page.html',
  styleUrls: ['./carta.page.scss'],
})
export class CartaPage implements OnInit {

  lstItem = [
    {title : 'Menus', key : 'menus'},
    {title : 'Para Compartir', key : 'paracompartir'},
    {title : 'Raciones', key : 'raciones'},
    {title : 'Ensaladas', key : 'ensaladas'},
    {title : 'Pizzas', key : 'pizzas'},
    {title : 'Bocadillos', key : 'bocadillos'},
    {title : 'Hamburguesas', key : 'hamburguesas'},

  ];

  constructor(
    private router: Router,
    private shareService: ShareService
  ) { }

  ngOnInit() {
    this.shareService.changedTitleMenu.next('Carta');

  }

  irA(url){
    this.router.navigateByUrl(url, { replaceUrl: true });
  }

}
