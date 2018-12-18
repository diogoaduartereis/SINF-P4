import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CataloguePage } from '../catalogue/catalogue';
import { CalendarPage } from '../calendar/calendar';
import { ListClientsPage } from '../list-clients/list-clients';
import { OrdersPage } from '../../pages/orders/orders';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openCatalogue() {
    this.navCtrl.push(CataloguePage);
  }

  openCalendar() {
    this.navCtrl.push(CalendarPage);
  }

  openClients() {
    this.navCtrl.push(ListClientsPage);
  }

  openOrders() {
    this.navCtrl.push(OrdersPage);
  }
  
}
