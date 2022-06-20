import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.servies';

@Component({
  selector: 'resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {

  constructor(
    private router: Router,
    private shareService: ShareService
  ) { }

  ngOnInit() {
    this.shareService.changedTitleMenu.next('Resumen');
  }

  irA(url){
    this.router.navigateByUrl(url, { replaceUrl: true });
  }

}
