import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PrimaveraProvider } from '../../providers/primavera/primavera';

/**
 * Generated class for the AddClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html',
  providers: [PrimaveraProvider]
})
export class AddClientPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public primavera: PrimaveraProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddClientPage');
  }

  goToHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }

  createClient()
  {
    const access_token = this.primavera.genAccessToken();

    const body = {
      "Cliente": "Diogo",
      "Nome": "Diogo",
      "Descricao": "qwerty1234",
      "Morada": "PASSEO DE PORTUGAL, 12345",
      "Localidade": "VILANUEVA DE ARRIBA",
      "CodigoPostal": "61001",
      "LocalidadeCodigoPostal": "MADRID",
      "Telefone": "00.034.1.474747447",
      "Fax": "00.034.1.4374747474",
      "EnderecoWeb": "http://alcad.es",
      "Distrito": "",
      "NumContribuinte": "989922456",
      "Pais": "ES",
      "Moeda": "EUR"
      };

    console.log(this.primavera.createClient(access_token, body));
  }

}
