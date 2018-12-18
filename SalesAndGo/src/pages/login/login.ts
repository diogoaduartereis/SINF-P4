import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PrimaveraProvider } from '../../providers/primavera/primavera';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [PrimaveraProvider]
})
export class LoginPage {

  email:string = "";
  primavera:PrimaveraProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public prim: PrimaveraProvider, private alertCtrl: AlertController) {
    this.primavera = prim;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onFocus() {
    let div = document.getElementById('div_logo');

    div.style.height = "10%"; 
  }

  onBlur() {
    let div = document.getElementById('div_logo');

    div.style.height = "40%"; 
  }

  login() {
    console.log(this.email);

    const access_token = this.primavera.genAccessToken();

    // query que vai obter o id do vendedor a partir do seu email
    let query = `SELECT Vendedor FROM Vendedores WHERE EMail = '` + this.email + `'`;

    // envia pedido ao primavera para executar a query e coloca o resultado na variavel id
    let id = this.primavera.postRequest(access_token,'/Administrador/Consulta', 200, query);

    console.log(id);
    // id = [{Vendedor: "PRC"}]
    if(id.length >= 1) {
      let finalId = id[0].Vendedor;

      this.storage.set('Vendedor', finalId);

      this.navCtrl.setRoot(HomePage);
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Authentication error!',
        subTitle: 'Could not authenticate salesman with email ' + this.email,
        buttons: ['OK!']
      });
      alert.present();
    }
  }



}
