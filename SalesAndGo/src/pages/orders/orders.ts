import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { CataloguePage } from '../catalogue/catalogue';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

import { PrimaveraProvider } from '../../providers/primavera/primavera';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  myInput: any;
  date: any;
  status: any;
  type:any;
  access_token: string;
  docs: {};
  vendedor: string = "";
  originalData: any;
  modifiedData: any;
  savedData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public primavera: PrimaveraProvider, private storage: Storage) {

    const access_token = primavera.genAccessToken();
   
    this.storage.get('Vendedor').then((val) => {
      this.vendedor = val;
      console.log(this.vendedor);
      
      const query = `SELECT CD.Responsavel, CD.Data, CD.TipoDoc, CD.Documento, CD.NumDoc, CD.TotalDocumento, CD.Nome,
        CDS.Estado FROM CabecDoc CD INNER JOIN CabecDocStatus CDS ON CDS.IdCabecDoc = CD.Id WHERE (CD.TipoDoc='ECL' OR CD.TipoDoc='ORC') AND CD.Responsavel ='`+ this.vendedor + `' ORDER BY CD.Data`;

      this.docs = primavera.postRequest(access_token, '/Administrador/Consulta', 200, query);

      console.log(this.docs);

      this.originalData = this.docs;
      this.modifiedData = JSON.parse(JSON.stringify(this.originalData));
      this.savedData = JSON.parse(JSON.stringify(this.originalData));
 
    });

    
  }

  resetData() {
    this.modifiedData = JSON.parse(JSON.stringify(this.originalData));
  }

  filterData() {

    this.resetData();

    if (this.status != null) {
      this.modifiedData = this.modifiedData.filter((doc) => {
        return doc.Estado === this.status;
      });
    }

    if (this.date != null) {
      this.modifiedData = this.modifiedData.filter((doc) => {
        return doc.Data.split('T')[0] == this.date;
      });
    }

    if (this.type != null) {
      this.modifiedData = this.modifiedData.filter((doc) => {
        return doc.TipoDoc == this.type;
      });
    }

    this.savedData = JSON.parse(JSON.stringify(this.modifiedData));

    if (this.myInput != null && this.myInput.trim() !== '') {
      this.modifiedData = this.modifiedData.filter((doc) => {
        return doc.Nome.toLowerCase().includes(this.myInput.toLowerCase());
      });
    }

  }

  filterItems(ev: any) {

    let val = ev.target.value;

    this.modifiedData = this.savedData;

    if (val && val.trim() !== '') {
      this.modifiedData = this.modifiedData.filter(function (doc) {
        return doc.Nome.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  orderData() {

    if (document.getElementById('sort').classList.contains('down')) {
      this.modifiedData.sort(function (a, b) { return Date.parse(b.Data) - Date.parse(a.Data) });
      document.getElementById('sort').classList.remove('down');
      document.getElementById('sort').classList.add('up');

      document.getElementById('down').style.display = 'none';
      document.getElementById('up').style.display = 'block';

    } else {
      this.modifiedData.sort(function (a, b) { return Date.parse(a.Data) - Date.parse(b.Data) });

      document.getElementById('sort').classList.remove('up');
      document.getElementById('sort').classList.add('down');

      document.getElementById('up').style.display = 'none';
      document.getElementById('down').style.display = 'block';
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  openOrder(doc_id) {

    this.navCtrl.push(OrderPage, { docid: doc_id });
  }

  redirectCatalogue(){
    this.navCtrl.push(CataloguePage);
  }
  
  goToHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }
}
