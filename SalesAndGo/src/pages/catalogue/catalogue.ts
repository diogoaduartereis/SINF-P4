import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PrimaveraProvider } from '../../providers/primavera/primavera';
import { CheckoutPage} from '../checkout/checkout';
import { ProductPage } from '../product/product';

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
  providers: [PrimaveraProvider],
})
export class CataloguePage {

  goToHomePage()
  {
    this.navCtrl.setRoot(HomePage)
  }

  searchQuery: string = '';
  items: string[] = [];
  sortValue: string = 'PVP1';
  sortType: string = 'Price'
  products: string[] = [];
  originalHTML: string = '';
  families: string[] = [];
  familiesArray: string[] = [];
  originalProducts: string[] = [];
  checkoutProducts: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public primavera: PrimaveraProvider) 
  {

    const access_token = primavera.genAccessToken();

    let query = `SELECT A.Artigo, A.Descricao, A.Observacoes, A.familia,
                  AM.PVP1, VAM.StkActual, AM.Moeda 
                  from Artigo A INNER JOIN ArtigoMoeda AM 
                  ON A.Artigo = AM.Artigo join V_INV_ArtigoArmazem VAM 
                  on A.artigo = VAM.artigo
                  ORDER BY AM.PVP1`;

    let response = primavera.postRequest(access_token,'/Administrador/Consulta', 200, query);
    if(typeof response != 'undefined')
    {
      this.products = response;
      this.uniq_fast(this.products);
    }  
  }

  //Searchbar products
  beforeSearchProducts = [];
  getItems(ev: any) {
    
    if(this.beforeSearchProducts.length == 0)
      this.beforeSearchProducts = this.products;
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.products = this.products.filter((item) => {
        return (item['Descricao'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else
      this.products = this.beforeSearchProducts;
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
  
  //FilterBox
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

        if(this.originalProducts.length == 0)
          this.originalProducts = this.products;
        
        for(let i = 0; i < data.length; i++)
        {
          for(let j = 0; j < this.originalProducts.length; j++)
          {
            let familia = this.originalProducts[j]
            if(familia['familia'] == data[i])
            {
              this.newProducts.push(familia);
            }
          }
        }
        if(this.newProducts.length > 0)
        {
          this.products = this.newProducts; 
          this.newProducts = [];
        }
        else
          this.products = this.originalProducts;
      }
    });
    alert.present();
  }

  sortProducts(array, sort)
  {
    const sortType = this.sortValue;
    function compareToAscend(a,b) {
      if (a[sortType] < b[sortType])
        return -1;
      if (a[sortType] > b[sortType])
        return 1;
      return 0;
    }

    function compareToDescend(a,b) {
      if (a[sortType] > b[sortType])
        return -1;
      if (a[sortType] < b[sortType])
        return 1;
      return 0;
    }

    if(sort == 'Ascending')
    {
      array.sort(compareToAscend);
    }

    else if(sort == 'Descending')
    {
      array.sort(compareToDescend);
    }
  }

  //arrow up/down ascending/descending
  visible = false;
  ASCDESC = 'Ascending'
  toggle() {
    this.visible = !this.visible;

    if(document.getElementById('arrowUp') != null)
    {
      this.ASCDESC = 'Descending'
      this.sortProducts(this.products, this.ASCDESC); 
    }
    
    if(document.getElementById('arrowDown') != null)
    {
      this.ASCDESC = 'Ascending'
      this.sortProducts(this.products, this.ASCDESC); 
    }
  }

  //Sort by price/stock/name
  showCheckboxSort() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Sort Products By');

    if(this.sortType == 'Price')
    {
      alert.addInput({
        id: 'PRICE',
        type: 'radio',
        label: 'Price',
        value: 'PVP1', 
        checked: true
      });
    }
    else
    {
      alert.addInput({
        id: 'PRICE',
        type: 'radio',
        label: 'Price',
        value: 'PVP1', 
        checked: false
      });
    }

    if(this.sortType == 'Stock')
    {
      alert.addInput({
        id: 'STOCK',
        type: 'radio',
        label: 'Stock',
        value: 'StkActual',
        checked: true
      });
    }
    else
    {
      alert.addInput({
        id: 'STOCK',
        type: 'radio',
        label: 'Stock',
        value: 'StkActual',
        checked: false
      });
    }

    if(this.sortType == 'Name')
    {
      alert.addInput({
        id: 'NAME',
        type: 'radio',
        label: 'Name',
        value: 'Descricao',
        checked: true
      });
    }
    else
    {
      alert.addInput({
        id: 'NAME',
        type: 'radio',
        label: 'Name',
        value: 'Descricao',
        checked: false
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        this.sortValue = data;
        if(this.sortValue == 'PVP1')
          this.sortType = 'Price';
        else if(this.sortValue == 'StkActual')
          this.sortType = 'Stock';
        else
          this.sortType = 'Name';
        this.sortProducts(this.products, this.ASCDESC);
      }
    });
    alert.present();
  }

  //Add to cart
  orderLength = 0;
  addProductToCart(elem)
  {
    this.checkoutProducts.push(elem);
    this.orderLength++;
  }

  //infinite scroll through the items
  /*doInfinite(infiniteScroll) {

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.products.push( this.products.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }*/
  
  public goToCheckout(event, checkoutProducts)
  {
    this.navCtrl.push(CheckoutPage,{
      products: checkoutProducts
      });
  }

  goToProductPage(event, product)
  {
    this.navCtrl.push(ProductPage,{
      product: product
      });
  }
}
