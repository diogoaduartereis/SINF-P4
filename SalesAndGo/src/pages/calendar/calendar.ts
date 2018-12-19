import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrimaveraProvider } from '../../providers/primavera/primavera';
import { ViewChild } from '@angular/core'
import { Calendar } from 'ionic3-calendar-en/src/calendar/calendar';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

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
  dateSelected:boolean = false;

  @ViewChild('calendar') calendar: Calendar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public primavera: PrimaveraProvider, private launchNavigator: LaunchNavigator) {
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

      this.currentEvents.push(curEvent);
    }

    this.dispEvents = this.currentEvents;
  }

  openMap(location) {
    this.launchNavigator.navigate(location).then(
      success => console.log('Launched navigator'), 
      error => console.log('Error launching navigator', error)
    );
  }

  onDaySelect(date){ 
    let events = this.currentEvents.filter((event) => {
      return event.year == date.year && event.month == date.month && event.date == date.date;
    });

    this.dateSelected = true;

    this.dispEvents = events;
  }

  onClearDay(){
    this.calendar.dateArray[this.calendar.lastSelect].isSelect = false;
    
    this.dateSelected = false;

    this.dispEvents = this.currentEvents;
  }

  ionViewDidLoad() {
    
  }

}
