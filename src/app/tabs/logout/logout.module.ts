import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoutPageRoutingModule } from './logout-routing.module';
import { LogoutPage } from './logout.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: LogoutPage }]),
    LogoutPageRoutingModule,
  ],
  declarations: [LogoutPage]
})
export class LogoutPageModule {}
