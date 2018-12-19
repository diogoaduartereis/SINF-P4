import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CataloguePage } from '../catalogue/catalogue';
import { CalendarPage } from '../calendar/calendar';
import { ListClientsPage } from '../list-clients/list-clients';
import { OrdersPage } from '../../pages/orders/orders';
import { PrimaveraProvider } from '../../providers/primavera/primavera'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PrimaveraProvider]
})
export class HomePage {

  dispEvents:any[] = [];

  constructor(public navCtrl: NavController, public primavera: PrimaveraProvider) {
    const access_token = primavera.genAccessToken();

    let query = "SELECT * FROM Tarefas;"

    let events = primavera.postRequest(access_token,'/Administrador/Consulta',200,query);

    for (event of events){
      let curEvent = {year:1970,month:1,date:1,start:"1970/1/1, 00:00",end:"1970/1/1, 00:00",location:"",title:""};

      let startDate : Date = new Date(Date.parse(event['DataInicio']));
      let endDate : Date = new Date(Date.parse(event['DataFim']));
      curEvent.year = startDate.getFullYear();
      curEvent.month = startDate.getMonth();
      curEvent.date = startDate.getDate();
      curEvent.start = startDate.toLocaleString();
      curEvent.end = endDate.toLocaleString();

      query = `SELECT Nome FROM Clientes WHERE Cliente = '` + event['EntidadePrincipal'] + `';`;
      
      curEvent['client'] = primavera.postRequest(access_token,'/Administrador/Consulta', 200, query)[0].Nome;

      curEvent.location = event['LocalRealizacao'];
      curEvent.title = event['Resumo'];

      this.dispEvents.push(curEvent);
    }
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
