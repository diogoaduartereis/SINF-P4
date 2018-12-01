import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient,HttpHeaders} from '@angular/common/http';


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
})
export class ClientPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,  public http: HttpClient) {
  }

  insertDocumentoVenda(event: any){
    let document,linha1,linha2;
    let linhas = [];
    linha1={
      Artigo:"A0001",
      Quantidade:55
    }
    linha2={
      Artigo:"A0002",
      Quantidade:55
    }
    linhas.push(linha1);
    linhas.push(linha2);
    document = {
      Linhas:linhas,
      Tipodoc: "FA",
      Serie: "A",
      Entidade: "C0003",
      TipoEntidade: "C"
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ewlcPs7W2Kj727wttW7BTA80I4CghHOeOkrYBxoW7IjSOQY4GvosnPzZndftqeU0trTtj6vekjHtCZYoLnSKXpJJut4Hhp37MVeDqhCednn4mBL-vPUWeMiMsi6ovzBIjUTxuTVOlfSoTzJYMHDQ6KqIJFflU_D-msUP-w6oruN0HvoCbd31R0Vyqgs-ixeuLtrcfyquHb24h0CDo8BU1VMeig5g3KLSVmugs-qadV3evVeAKhjUHW6V08HAFe8WjVQbj8I7w_xfYrLbZWNgSVZxFYNiPKT6z025MEyDnx9ffCo_7P_S-yaHuc3q1aLK'
      })
    };
    this.http.post("http://localhost:2018/WebApi/Vendas/Docs/CreateDocument/", document,httpOptions)
    .subscribe(response => console.log(response));
    
  
  }
}
