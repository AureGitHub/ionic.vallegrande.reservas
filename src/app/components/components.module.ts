import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AureDateComponent } from './aure-date/aure-date.component';
import { LanguageService } from './aure-date/languaje.service';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AureDateComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  exports:      [ 
    AureDateComponent 
  ],

  providers: [
    LanguageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
 
})
export class ComponentsModule { }
