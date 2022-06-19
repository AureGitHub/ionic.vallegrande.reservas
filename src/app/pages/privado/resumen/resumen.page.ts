import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  irA(url){
    this.router.navigateByUrl(url, { replaceUrl: true });
  }

}
