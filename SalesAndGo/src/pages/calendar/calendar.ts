import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrimaveraProvider } from '../../providers/primavera/primavera';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
  providers: [PrimaveraProvider]
})
export class CalendarPage {

  currentEvents:any[] = [];
  dispEvents:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public primavera: PrimaveraProvider) {
    const access_token = primavera.genAccessToken();

    let query = "SELECT * FROM Tarefas;"

    let events = primavera.postRequest(access_token,'/Administrador/Consulta',200,query);

    for (event of events){
      let curEvent = {year:1970,month:1,date:1,start:"1970/1/1, 00:00",end:"1970/1/1, 00:00",client:"",location:""};

      let startDate : Date = new Date(Date.parse(event['DataInicio']));
      let endDate : Date = new Date(Date.parse(event['DataFim']));
      curEvent.year = startDate.getFullYear();
      curEvent.month = startDate.getMonth();
      curEvent.date = startDate.getDate();
      curEvent.start = startDate.toLocaleString();
      curEvent.end = endDate.toLocaleString();

      curEvent.client = event['EntidadePrincipal'];
      curEvent.location = event['LocalRealizacao'];

      this.currentEvents.push(curEvent);
    }

    console.log(this.currentEvents);

    this.dispEvents = this.currentEvents;
  }

  onDaySelect(date){ 
    console.log(this.currentEvents);

    let events = this.currentEvents.filter((event) => {
      return event.year == date.year && event.month == date.month && event.date == date.date;
    });

    console.log(events);
    this.dispEvents = events;
  }

  ionViewDidLoad() {
    
  }

}
