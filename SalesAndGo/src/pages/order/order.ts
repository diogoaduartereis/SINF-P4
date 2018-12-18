import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrimaveraProvider } from '../../providers/primavera/primavera';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [PrimaveraProvider]
})

export class OrderPage {

  document: object = {};
  linhas: {};
  docID: any;
  clientID: any;

  access_token: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public primavera: PrimaveraProvider) {

    this.docID = navParams.get('docid');

    const access_token = primavera.genAccessToken();

    let query = `SELECT CD.TipoDoc, CD.Entidade, CD.ModoPag, CD.Documento, CD.CodPostalLocalidade, CD.Data, CD.Nome, CD.NumContribuinte,
    CD.TotalDocumento, CDS.Estado FROM CabecDoc CD 
    INNER JOIN CabecDocStatus CDS ON CDS.IdCabecDoc = CD.Id WHERE CD.Documento =  '` + this.docID + `'`;

    this.document = primavera.postRequest(access_token, '/Administrador/Consulta', 200, query)[0];

    query = `SELECT LD.Artigo, LD.Quantidade, LD.PrecUnit, LD.PrecoLiquido, LD.TotalIva FROM LinhasDoc LD 
    INNER JOIN CabecDoc CD ON LD.IdCabecDoc = CD.Id WHERE CD.Documento =  '` + this.docID + `'`;

    this.linhas = primavera.postRequest(access_token, '/Administrador/Consulta', 200, query);

    console.log(this.document);
    console.log(this.linhas);

    this.clientID = this.document['Entidade'];


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  goToHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }

}
