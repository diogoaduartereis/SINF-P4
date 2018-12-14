import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the CataloguePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalogue',
  templateUrl: 'catalogue.html',
})
export class CataloguePage {

  goToHomePage()
  {
    this.navCtrl.setRoot(HomePage)
  }


  searchQuery: string = '';
  items: string[];
  sortValue: string = 'Price';
  products: string[];
  originalHTML: string = '';
  families: string[];
  familiesArray: object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'http://94.60.211.16:2018/WebApi/token', true);
    var params = 'username=FEUP&password=qualquer1&company=BELAFLOR&instance=DEFAULT&grant_type=password&line=professional';
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(params)

    let object = this;

    xhttp.onreadystatechange=function(){
      if(this.readyState==4 && this.status==200){
        let response = JSON.parse(xhttp.responseText)
        const Http = new XMLHttpRequest();
        const url = 'http://94.60.211.16:2018/WebApi/Administrador/Consulta'
        Http.open("POST", url);
        Http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        Http.setRequestHeader("Authorization", 'Bearer ' + response.access_token);
        const query = `SELECT A.Artigo, A.Descricao, A.Observacoes, A.familia,
                       AM.PVP1, VAM.StkActual, AM.Moeda 
                       from Artigo A INNER JOIN ArtigoMoeda AM 
                       ON A.Artigo = AM.Artigo join V_INV_ArtigoArmazem VAM 
                       on A.artigo = VAM.artigo
                       ORDER BY AM.PVP1`;
        Http.send(JSON.stringify(query))
        Http.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
            object.products = JSON.parse(Http.responseText).DataSet.Table;
            object.uniq_fast(object.products);
          }
        }
      }
    }

  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      '1'
    ];
  }

  finalizeItems() {
    this.items = [];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
  
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.initializeItems();
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else
      this.finalizeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CataloguePage');
  }

  // Returns the distinct familia element in an array
  uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
          var item = a[i]['familia'];
          if(seen[item] !== 1) {
                seen[item] = 1;
                out[j++] = item;
          }
    }
    this.families = out;
  }
  
  newProducts = [];
  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select products to see');
    
    if(typeof this.products !== 'undefined')
    {
      let familias = this.families;
      for(let i = 0; i < familias.length; i++)
      {
        let familia = familias[i];
        alert.addInput({
          type: 'checkbox',
          label: familia,
          value: familia,
        });
      }
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        if(this.originalHTML.length == 0)
          this.originalHTML = document.getElementById('productsListID').innerHTML;
        
        let originalProducts = this.products;
        let resultingHTML = ""
        for(let i = 0; i < data.length; i++)
        {
          for(let j = 0; j < this.products.length; j++)
          {
            let familia = originalProducts[j]
            if(familia['familia'] == data[i])
            {
              this.newProducts.push(familia);
              resultingHTML += 
                `
                <div class = "item-inner">
                <div class = "input-wrapper">
                <!--bindings={
                  "ng-reflect-ng-for-of": "[object Object],[object Object"
                }--><ion-item class="item item-block item-md"><div class="item-inner"><div class="input-wrapper"><!--bindings={
                  "ng-reflect-ng-if": "true"
                }--><ion-label class="label label-md">
                  <img src = "http://94.60.211.16:8080/images/` + familia['Observacoes'] +`" style="width:40%; height:40%; display:block; margin-left: auto; margin-right:auto;">
                  <h1 style="text-align:center; margin:8px;">` + familia['Descricao'] + `</h1>
                  <button style="float:left; width:50%; height:35px;" ion-button color="light">
                    <h2 style="margin:auto;"><b>` + familia['PVP1'] + familia['Moeda'] +`&emsp;<ion-icon name="cart" role="img" class="icon icon-md ion-md-cart" aria-label="cart" ng-reflect-name="cart"></b></h2>
                  </button>
                  <h2 style = "float:right;margin:12px;">Stock:` + familia['StkActual'] + `</h2>
                  </div>
                  </div>
                `
            }
          }
        }
        if(resultingHTML.length > 0)
        {
          document.getElementById('productsListID').innerHTML = resultingHTML + 
            `
            </ion-label></div><!--bindings={
              "ng-reflect-ng-if": "false"
            }--></div><div class="button-effect"></div>
            `;
        }
        else
        {
          this.newProducts = originalProducts;
          document.getElementById('productsListID').innerHTML = this.originalHTML;
        }
      }
    });
    alert.present();
  }

  visible = false;
  toggle() {
    this.visible = !this.visible;

    //From up to down
    if(document.getElementById('arrowUp') != null)
    {
      console.log(document.getElementById('arrowDown'));
    }
    
    if(document.getElementById('arrowDown') != null)
    {
      console.log(document.getElementById('arrowUp'));
    }
  }

  showCheckboxSort() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Sort Products By');

    if(this.sortValue == 'Price')
    {
      alert.addInput({
        id: 'PRICE',
        type: 'radio',
        label: 'Price',
        value: 'Price', 
        checked: true
      });
    }
    else
    {
      alert.addInput({
        id: 'PRICE',
        type: 'radio',
        label: 'Price',
        value: 'Price', 
        checked: false
      });
    }

    if(this.sortValue == 'Stock')
    {
      alert.addInput({
        id: 'STOCK',
        type: 'radio',
        label: 'Stock',
        value: 'Stock',
        checked: true
      });
    }
    else
    {
      alert.addInput({
        id: 'STOCK',
        type: 'radio',
        label: 'Stock',
        value: 'Stock',
        checked: false
      });
    }

    if(this.sortValue == 'Name')
    {
      alert.addInput({
        id: 'NAME',
        type: 'radio',
        label: 'Name',
        value: 'Name',
        checked: true
      });
    }
    else
    {
      alert.addInput({
        id: 'NAME',
        type: 'radio',
        label: 'Name',
        value: 'Name',
        checked: false
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        this.sortValue = data;
      }
    });
    alert.present();
  }
  
}

export class MyPage {

  constructor(public alertCtrl: AlertController) { }

 /* showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Which planets have you visited?');

    alert.addInput({
      type: 'checkbox',
      label: 'Alderaan',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bespin',
      value: 'value2'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }*/
}
