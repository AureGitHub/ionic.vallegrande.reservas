import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AureDateComponent } from './aure-date/aure-date.component';
import { LanguageService } from './aure-date/languaje.service';



@NgModule({
  declarations: [
    AureDateComponent],
  imports: [
    CommonModule
  ],
  exports:      [ 
    AureDateComponent 
  ],

  providers: [
    LanguageService
  ],
 
})
export class ComponentsModule { }
