import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncargoUpdatePage } from './encargo-update.page';
import { ShareModule } from '../share.module';
import { EncargoUpdatePageRoutingModule } from './encargo-update.routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EncargoUpdatePageRoutingModule,
    ShareModule
    
  ],
  declarations: [EncargoUpdatePage],
})
export class EncargoUpdatePageModule {}
