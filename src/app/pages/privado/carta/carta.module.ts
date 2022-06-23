import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CartaPage } from './carta.page';
import { GestionItemsPage } from './gestion-items/gestion-items.page';
import { CartaService } from './servicios/carta.service';
import { BuscadorComandaComponent } from './components/buscador-comanda/buscador-comanda.component';


const routes: Routes = [
  {
    path: '',
    component: CartaPage,
  },
  {
    path: 'gestion/:key/:title',
    component: GestionItemsPage,
  },

];


@NgModule({
  declarations: [ CartaPage,GestionItemsPage, BuscadorComandaComponent ],
  imports: [
   
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule, BuscadorComandaComponent]
  ,
  providers: [CartaService]
    
    
})
export class CartaModule {}
