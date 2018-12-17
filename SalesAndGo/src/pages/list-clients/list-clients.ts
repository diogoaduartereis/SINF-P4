import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ClientPage } from '../client/client';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ListClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-clients',
  templateUrl: 'list-clients.html',
})
export class ListClientsPage {
  //@ViewChild("myNavTabs") myNavTabs: NavTabsComponent;

  clients: object[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private callNumber: CallNumber) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'http://94.60.211.16:2018/WebApi/token', true);
    var params = 'username=FEUP&password=qualquer1&company=BELAFLOR&instance=DEFAULT&grant_type=password&line=professional';
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(params)

    let object = this;

    xhttp.onreadystatechange=function(){
      if(this.readyState==4 && this.status==200){
        let response = JSON.parse(xhttp.responseText)
        const Http = new XMLHttpRequest();
        const url = 'http://94.60.211.16:2018/WebApi/Administrador/Consulta'
        Http.open("POST", url);
        Http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        Http.setRequestHeader("Authorization", 'Bearer ' + response.access_token);
        const query = `SELECT C.Cliente, C.nome, C.Fac_Mor, C.Fac_Local, C.Fac_Cp, C.Fac_Cploc, C.Fac_Tel, C.NumContrib, C.Pais, C.Moeda 
                       FROM Clientes C`;
        Http.send(JSON.stringify(query))
        Http.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
            object.clients = JSON.parse(Http.responseText).DataSet.Table;
          }else{
            console.log(Http.responseText);
          }
        }
      }else{
        console.log(xhttp.responseText);
      }
    }
  }

  callClient(event,num_tel){
    event.stopPropagation();
    this.callNumber.callNumber(num_tel, true).then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
  }

  startCart(event,client_id){
    event.stopPropagation();
    const alert = this.alertCtrl.create({
      title: 'Not Implemented Yet :(',
      subTitle: 'The functionality to start a cart is not implemented yet!',
      buttons: ['OK']
    });
    alert.present();
  }

  openClient(client_id) {
    this.navCtrl.push(ClientPage,{cid: client_id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListClientsPage');
  }

}
