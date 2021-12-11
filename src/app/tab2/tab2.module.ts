import { MbscModule } from '@mobiscroll/angular';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  imports: [ 
    MbscModule, 
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    HttpClientJsonpModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
