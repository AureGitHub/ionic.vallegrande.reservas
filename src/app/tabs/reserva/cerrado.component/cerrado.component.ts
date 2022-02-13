import { Component, Input, OnInit } from '@angular/core';
import { CerradoModel } from 'src/app/services/bd/models/cerrado.model';
import { ShareService } from 'src/app/services/share.servies';


@Component({
  selector: 'cerrado-component',
  templateUrl: './cerrado.component.html',
  styleUrls: ['./cerrado.component.css']
})
export class CerradoComponent  implements OnInit {

  @Input() cerrado: CerradoModel;


  icon : any;


  constructor(
    private shareService : ShareService
   ) {
    this.icon = this.shareService.icon;
    }

  ngOnInit() {

    
       

  }

  
   
}
