import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ClientPage } from '../client/client';
import { CallNumber } from '@ionic-native/call-number';
import { PrimaveraProvider } from '../../providers/primavera/primavera';
import { AddClientPage } from '../add-client/add-client';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

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
  providers: [PrimaveraProvider]
})
export class ListClientsPage {
  //@ViewChild("myNavTabs") myNavTabs: NavTabsComponent;

  clients: object[] = [];
  vendedor: any;

  modifiedData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private callNumber: CallNumber,
              public primavera: PrimaveraProvider, private storage: Storage) {

    const access_token = primavera.genAccessToken();
    this.storage.get('Vendedor').then((val) => {
      this.vendedor = val;
      const query = `SELECT V.Vendedor, C.Cliente, C.nome, C.Fac_Mor, C.Fac_Local, C.Fac_Cp, C.Fac_Cploc, C.Fac_Tel, C.NumContrib, C.Pais, C.Moeda 
      FROM Clientes C INNER JOIN Vendedores V on V.Vendedor = C.Vendedor Where C.Vendedor = '` + this.vendedor + `'ORDER BY V.Vendedor`;
  
      this.clients = primavera.postRequest(access_token, '/Administrador/Consulta', 200, query);
      this.modifiedData = this.clients;
    });
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

  filterItems(ev: any) {

    let val = ev.target.value;

    this.modifiedData = this.clients;

    if (val && val.trim() !== '') {
      this.modifiedData = this.modifiedData.filter(function (doc) {
        return doc.nome.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  openClient(client_id) {
    this.navCtrl.push(ClientPage,{cid: client_id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListClientsPage');
  }

  createNewClient()
  {
    this.navCtrl.push(AddClientPage);
  }

  goToHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }

}
