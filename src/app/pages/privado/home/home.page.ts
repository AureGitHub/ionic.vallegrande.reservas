import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.servies';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private shareService: ShareService
  ) { }

  ngOnInit() {
    this.shareService.changedTitleMenu.next('Inicio');
  }

  irA(url){
    this.router.navigateByUrl(url, { replaceUrl: true });
  }

}
