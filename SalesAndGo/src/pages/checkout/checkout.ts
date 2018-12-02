import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
})
export class CheckoutPage {
  clients:any=[];
  token: string;
  products:any=[{Descricao:"Marcador"},{Descricao:"Pencil"}];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpClient) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'http://localhost:2018/WebApi/token', true);
    var params = 'username=FEUP&password=qualquer1&company=BELAFLOR&instance=DEFAULT&grant_type=password&line=professional';
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(params);
    var classthis = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        classthis.token = JSON.parse(xhttp.responseText).access_token;
        console.log(classthis.token);

        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + classthis.token,
          }),
        };
        // get clients
        let query = `"SELECT V.Vendedor, V.Nome, C.Cliente FROM Vendedores V INNER JOIN Clientes C ON C.Vendedor = V.Vendedor WHERE C.Vendedor = '1' ORDER BY V.Vendedor"`;
        classthis.http.post("http://localhost:2018/WebApi/Administrador/Consulta", query, options)
          .subscribe((response : any) => {
            classthis.clients = response.DataSet.Table;
            console.log(classthis.clients);
          });
        // get products
        classthis.http.get("http://localhost:2018/WebApi/Base/Artigos/LstArtigos", options)
          .subscribe((response : any) => { 
            classthis.products = response.DataSet.Table;
            console.log(classthis.products);
          });
      }
    }
  }

  insertDocumento(event: any, docType) {
    if (!this.token)
      return;
    let document, linha1, linha2;
    let linhas = [];
    linha1 = {
      Artigo: "A0001",
      Quantidade: 50
    }
    linha2 = {
      Artigo: "A0002",
      Quantidade: 50
    }
    linhas.push(linha1);
    linhas.push(linha2);
    document = {
      Linhas: linhas,
      Tipodoc: docType,
      Serie: "A",
      Entidade: "C0003",
      TipoEntidade: "C"
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      })
    };
    this.http.post("http://localhost:2018/WebApi/Vendas/Docs/CreateDocument/", document, httpOptions)
      .subscribe(response => console.log(response));
  }
}
