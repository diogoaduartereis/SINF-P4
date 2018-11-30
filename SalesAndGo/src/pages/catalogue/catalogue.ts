import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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

  searchQuery: string = '';
  items: string[];
  sortValue: string = 'Price';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    
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

    alert.addInput({
      type: 'checkbox',
      label: 'Desktops',
      value: 'Desktop',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Laptops',
      value: 'Laptop',
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Smartphones',
      value: 'Smartphone',
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
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
