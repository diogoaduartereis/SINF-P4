import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { PrimaveraProvider } from '../../providers/primavera/primavera';


/**
 * Generated class for the ClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
  providers: [PrimaveraProvider]
})
export class ClientPage {

  client: object = {};
  total_faturacao: number;
  total_orcamento: number;
  access_token: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private callNumber: CallNumber,
              public primavera: PrimaveraProvider) {
    let Cliente = navParams.get('cid');

    const access_token = primavera.genAccessToken();

    console.log(access_token);

    let query = `SELECT C.nome, C.Fac_Mor, C.Fac_Local, C.Fac_Cp, C.Fac_Cploc, C.Fac_Tel, C.NumContrib, C.Pais, C.Moeda, C.Notas
                   FROM Clientes C
                   WHERE C.Cliente = '` + Cliente + `'`;
    
    this.client = primavera.postRequest(access_token,'/Administrador/Consulta', 200, query)[0];

    query = `SELECT CD.Entidade, SUM(CD.TotalDocumento) AS TotalFaturacao FROM
             CabecDoc CD INNER JOIN Clientes C ON C.Cliente = CD.Entidade INNER
             JOIN DocumentosVenda DV ON DV.Documento = CD.TipoDoc WHERE
             DV.TipoDocumento = 4 AND C.Cliente = '` + Cliente + `' GROUP BY CD.Entidade`;
    
    this.total_faturacao = primavera.postRequest(access_token,'/Administrador/Consulta', 200, query)[0].TotalFaturacao;
  }

  callClient(num_tel){
    this.callNumber.callNumber(num_tel, true).then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
  }
}
