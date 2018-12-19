import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrimaveraProvider } from '../../providers/primavera/primavera';
import { CataloguePage } from '../catalogue/catalogue';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
  providers: [PrimaveraProvider],
})
export class CheckoutPage {
  clients: any = [];
  selectedClient: any = { Fac_Mor: '', Moeda: '' };
  isEnabled: boolean = false;
  token: string;
  moeda: string;
  products: string[] = [];
  total: any = 0;
  primaveraAccess: any;
  access_token: any;
  vendedor: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public http: HttpClient, public primavera: PrimaveraProvider, private storage: Storage, private toastCtrl: ToastController) {
    this.products = navParams.get('products');
    if (this.products)
      for (var i = 0; i < this.products.length; i++) {
        this.moeda = this.products[i]['Moeda'];
        this.total += this.products[i]['PVP1'] * this.products[i]['quantidade'];
      }
    this.primaveraAccess = primavera;
    this.access_token = primavera.genAccessToken();
    this.storage.get('Vendedor').then((val) => {
      this.vendedor = val;
      console.log(this.vendedor);
      let query = `SELECT V.Vendedor, C.Nome, C.Cliente, C.Fac_Mor, C.Moeda FROM Vendedores V INNER JOIN Clientes C ON C.Vendedor = V.Vendedor WHERE C.Vendedor = '` + this.vendedor + `' ORDER BY V.Vendedor`;
      let response = primavera.postRequest(this.access_token, '/Administrador/Consulta', 200, query);
      if (typeof response != 'undefined') {
        this.clients = response;
      }
      console.log(this.clients);
    });
  }

  decrementProduct(product) {
    let index = this.products.indexOf(product);
    if (index != -1) {
      this.products[index]['quantidade']--;
      this.total = this.total - this.products[index]['PVP1'];
      this.products[index]['StkActual']++;
      if (this.products[index]['quantidade'] === 0) {
        this.products.splice(index, 1)
        if (this.products.length === 0)
          this.navCtrl.pop();
      }
      else this.products[index]['isPlusEnabled'] = true;
    }
  }

  incrementProduct(product) {
    product['quantidade']++;
    this.total = this.total + product['PVP1'];
    product['StkActual']--;
    if (product['StkActual'] === 0)
      product['isPlusEnabled'] = false;
  }

  onSelectClient() {
    this.isEnabled = true;
  }

  insertDocumento(products, docType) {
    let document;
    let linhas = [];

    for (var i = 0; i < products.length; i++) {
      let linha = { Artigo: products[i].Artigo, Quantidade: products[i].quantidade };
      linhas.push(linha);
    }
    document = {
      Linhas: linhas,
      Tipodoc: docType,
      Serie: "A",
      Entidade: this.selectedClient.Cliente,
      TipoEntidade: "C"
    }

    let response = this.primaveraAccess.postRequest(this.access_token, '/Vendas/Docs/CreateDocument/', 200, document);
    if (response.length == 0) {
      let alert = this.alertCtrl.create();
      alert.setTitle('Orded Completed');

      alert.addButton({
        text: 'Dismiss',
        handler: data=>{this.navCtrl.pop();}
      })
      alert.present();
        
    }
    else
    {
      let toast = this.toastCtrl.create({
        message: 'Failed to perform the action',
        duration: 1500,
        position: 'top'
      });
      toast.present();
    }
  }

  insertOportunidade(products) {
    let vendedor = "";
    let oportunidadeKey = "OPORT_" + Date.now();
    this.storage.get("Vendedor").then((val) => {
      vendedor = val;
    });
    let obj = {
      "Oportunidade": oportunidadeKey,
      "Descricao": "Oportunidade de Venda",
      "DataCriacao": "11/27/2018",
      "DataExpiracao": "11/27/2040",
      "Resumo": "Oportunidade de Venda",
      "Entidade": this.selectedClient.Cliente,
      "TipoEntidade": "C",
      "EstadoVenda": "0",
      "Moeda": "EUR",
      "Vendedor": vendedor,
      "CicloVenda": "C0001",
      "Zona": "01"
    };

    console.log(obj);

    this.primaveraAccess.postRequest(this.access_token, '/CRM/OportunidadesVenda/Actualiza/""', 204, obj);


    let query = "SELECT ID FROM CabecOportunidadesVenda WHERE Oportunidade = '" + oportunidadeKey + "';";
    let oportunidadeID = this.primaveraAccess.postRequest(this.access_token, "/Administrador/Consulta", 200, query)[0].ID;

    let newobj = {
      "Linhas": [
          {
            "IdOportunidade": oportunidadeID,
            "NumProposta": "1",
              "Artigo": products[0].Artigo,
              "Quantidade": products[0].Quantidade
          }
      ],
      
      "IdOportunidade": oportunidadeID,
      "NumProposta": "1"
    };

    this.primaveraAccess.postRequest(this.access_token, '/CRM/PropostasOPV/Actualiza/', 204, newobj);

    this.navCtrl.push(CataloguePage);
  }
}
