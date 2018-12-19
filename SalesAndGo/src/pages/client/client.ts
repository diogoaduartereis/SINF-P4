import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { PrimaveraProvider } from '../../providers/primavera/primavera';
import { CataloguePage } from '../catalogue/catalogue';
import { EditClientPage } from '../edit-client/edit-client';
import { ToastController } from 'ionic-angular';

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
  clientInfo: string;
  myNotes: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private callNumber: CallNumber,
              public primavera: PrimaveraProvider, private toastCtrl: ToastController) {
    this.clientInfo = "information";
    let Cliente = navParams.get('cid');

    const access_token = primavera.genAccessToken();

    console.log(access_token);

    let query = `SELECT C.Cliente, C.Vendedor, C.nome, C.Fac_Mor, C.Fac_Local, C.Fac_Cp, C.Fac_Cploc, C.Fac_Tel, C.NumContrib, C.Pais, C.Moeda, C.notas,
                   C.ModoPag, C.ModoRec, C.CondPag
                   FROM Clientes C
                   WHERE C.Cliente = '` + Cliente + `'`;
    
    this.client = primavera.postRequest(access_token,'/Administrador/Consulta', 200, query)[0];

    query = `SELECT CD.Entidade, SUM(CD.TotalDocumento) AS TotalFaturacao FROM
             CabecDoc CD INNER JOIN Clientes C ON C.Cliente = CD.Entidade INNER
             JOIN DocumentosVenda DV ON DV.Documento = CD.TipoDoc WHERE
             DV.TipoDocumento = 4 AND C.Cliente = '` + Cliente + `' GROUP BY CD.Entidade`;
    
    this.total_faturacao = 0;
    let result = primavera.postRequest(access_token,'/Administrador/Consulta', 200, query)[0];
    if(result){
      this.total_faturacao = result.TotalFaturacao;
    }
  }

  callClient(num_tel){
    this.callNumber.callNumber(num_tel, true).then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
  }
  
  goToCatalogue(event, client)		
  {		
    this.navCtrl.push(CataloguePage, {client:client});		
  }

  goToEditPage(event, client)
  {
    this.navCtrl.push(EditClientPage, {client:client});		
  }

  saveNotes(event, client)
  {
    const access_token = this.primavera.genAccessToken();
    let nome = client['nome'];
    let Morada = client['Fac_Mor'];
    let Telefone = client['Fac_Tel'];
    let NumContribuinte = client['NumContrib'];
    let Moeda = client['Moeda'];
    let ModoPag = client['ModoPag'];
    let ModoRec = client['ModoRec'];
    let CondPag = client['CondPag'];
    let vendedor = client['Vendedor'];
    let id = client['Cliente'];
    let Notes = this.myNotes;

    const body = {
      "CodigoTabLog": "Cliente",
      "ChaveLog": "Cliente",
      "EstadoBE": "",
      "Vendedor": vendedor,
      "Cliente": id,
      "Nome": nome,
      "Morada": Morada,
      "Telefone": Telefone,
      "NumContribuinte": NumContribuinte,
      "Moeda": Moeda,
      "CondPag": CondPag,
      "ModoPag": ModoPag,
      "ModoRec": ModoRec,
      "notas": Notes,
      "EmModoEdicao": true,
      };
      
    if(this.primavera.createClient(access_token, body) == 1)
    {
      let alert = this.alertCtrl.create();
      alert.setTitle('Note Added');

      alert.addButton({
        text: 'Dismiss',
        handler: data=>{this.navCtrl.setRoot(ClientPage, {"cid":this.navParams.get('cid')})}
      })
      alert.present();
    }
    else
    {
      let toast = this.toastCtrl.create({
        message: 'Note failed to be added',
        duration: 1500,
        position: 'top'
      });
      toast.present();
    }
  }
}
