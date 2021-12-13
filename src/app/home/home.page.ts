import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Contact } from '../models/contact';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { NewContactPage } from '../new-contact/new-contact.page';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public reservas: Observable<Reserva[]>;

  constructor(
    private dataService: DataService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {
    this.reservas = this.dataService.getReservas();
  }

  async openNewContactModal() {
    const modal = await this.modalController.create({
      component: NewContactPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }
}
