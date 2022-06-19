import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyFilterPipe } from 'src/app/pipe/pipe.reserva.servicio';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { ReservaCalendarioPage } from './reserva-calendario/reserva-calendario.page';
import { CerradoComponent } from './components/cerrado/cerrado.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReservaUpdatePage } from './reserva-update/reserva-update.page';
import { EncargoUpdatePage } from './encargo-update/encargo-update.page';


const routes: Routes = [
  {
    path: '',
    component: ReservaCalendarioPage,
  },

  {
    path: 'reserva-update',
    component: ReservaUpdatePage,
  },

  {
    path: 'encargo-update',
    component: EncargoUpdatePage,
  },

  


];

@NgModule({
  
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    
  ],
  declarations: [
    CerradoComponent,
    ReservaComponent,
    ReservaCalendarioPage,
    ReservaUpdatePage,
    EncargoUpdatePage,
    MyFilterPipe ,
   
  ],
})
export class ReservaModule {}
