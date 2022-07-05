import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reload',
  templateUrl: './reload.page.html',
  styleUrls: ['./reload.page.scss'],
})
export class ReloadPage implements OnInit {


  constructor(
  ) { }

  ngOnInit() {
    window.location.href = '/public/';
  }

}
