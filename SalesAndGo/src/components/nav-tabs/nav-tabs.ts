import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListClientsPage } from '../../pages/list-clients/list-clients';
import { CalendarPage } from '../../pages/calendar/calendar';
import { CataloguePage } from '../../pages/catalogue/catalogue';
import { OrdersPage } from '../../pages/orders/orders';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the NavTabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'nav-tabs',
  templateUrl: 'nav-tabs.html'
})
export class NavTabsComponent {

  text: string;

  constructor(public navCtrl: NavController) {
    
  }

  openHome() {
    this.navCtrl.push(HomePage);
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
