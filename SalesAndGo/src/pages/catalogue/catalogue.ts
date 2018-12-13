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
                       on A.artigo = VAM.artigo`;
        Http.send(JSON.stringify(query))
        Http.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
            object.products = JSON.parse(Http.responseText).DataSet.Table;
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

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select products to see');
    let familiesArray = [];
    
    if(typeof this.products !== 'undefined')
    {
      for(let i = 0; i < this.products.length; i++)
      {
          let productFamily = this.products[i]['familia'];
          if(familiesArray.indexOf(productFamily) == -1)
          {
            familiesArray.push(productFamily);
            alert.addInput({
              type: 'checkbox',
              label: productFamily,
              value: productFamily,
            });
          }
      }
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        let originalProducts = this.products;
        for(let i = 0; i < data.length; i++)
        {
          for(let j = 0; j < this.products.length; j++)
          {
            if(this.products[j]['familia'] == data[i])
            {
              console.log(document.getElementById('productsListID').innerHTML);
             /* document.getElementById('productsListID').innerHTML = 
                `
                <ion-item>
                  <img src = "http://94.60.211.16:8080/images/` + this.products[j]['Observacoes'] +`" style="width:40%; height:40%; display:block; margin-left: auto; margin-right:auto;">
                  <h1 style="text-align:center; margin:8px;">` + this.products[j]['Descricao'] + `</h1>
                  <button style="float:left; width:50%; height:35px;" ion-button color="light">
                    <h2 style="margin:auto;"><b>` + this.products[j]['PVP1'] + this.products[j]['Moeda'] +`&emsp;<ion-icon name="cart"></ion-icon></b></h2>
                  </button>
                  <h2 style = "float:right;margin:12px;">Stock:` + this.products[j]['StkActual'] + `</h2>
                </ion-item>
                `*/
            }
          }
        }
      }
    });
    alert.present();
  }

  showCheckboxSort() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Sort Products By');

    alert.addInput({
      id: 'PRICE',
      type: 'radio',
      label: 'Price',
      value: 'Price', 
      checked: true
    });

    alert.addInput({
      id: 'STOCK',
      type: 'radio',
      label: 'Stock',
      value: 'Stock',
      checked: false
    });

    alert.addInput({
      id: 'NAME',
      type: 'radio',
      label: 'Name',
      value: 'Name',
      checked: false
    });

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
