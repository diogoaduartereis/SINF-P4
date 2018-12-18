import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PrimaveraProvider } from '../../providers/primavera/primavera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ListClientsPage } from '../list-clients/list-clients';

/**
 * Generated class for the AddClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html',
  providers: [PrimaveraProvider]
})
export class AddClientPage {

  addClientForm: FormGroup;
  hash: Md5;

  constructor(public navCtrl: NavController, public navParams: NavParams, public primavera: PrimaveraProvider, private formBuilder: FormBuilder,private Md5: Md5,
              public alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.addClientForm = this.formBuilder.group({
      Nome: ['', Validators.required],
      Morada: ['', Validators.required],
      Telefone: ['', Validators.required],
      NumContribuinte: ['', Validators.required],
      Moeda: ['', Validators.required],
      CondPag: ['', Validators.required],
      ModoPag: ['', Validators.required],
      ModoRec: ['', Validators.required]
    });
    this.hash = this.Md5;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddClientPage');
  }

  goToHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }

  createClient()
  {
    const access_token = this.primavera.genAccessToken();
    let nome = this.addClientForm.value['Nome'];
    let Morada = this.addClientForm.value['Morada'];
    let Telefone = this.addClientForm.value['Telefone'];
    let NumContribuinte = this.addClientForm.value['NumContribuinte'];
    let Moeda = this.addClientForm.value['Moeda'];
    let Condpag = this.addClientForm.value['Condpag'];
    let ModoPag = this.addClientForm.value['ModoPag'];
    let ModoRec = this.addClientForm.value['ModoRec'];
    var d = new Date();
    var n = d.getTime();
    let id = n.toString().substr(0, 12);

    const body = {
      "Cliente": id,
      "Nome": nome,
      "Morada": Morada,
      "Telefone": Telefone,
      "NumContribuinte": NumContribuinte,
      "Moeda": Moeda,
      "CondPag": Condpag,
      "ModoPag": ModoPag,
      "ModoRec": ModoRec,
      };

    if(this.primavera.createClient(access_token, body) == 1)
    {
      let alert = this.alertCtrl.create();
      alert.setTitle('Cliented Successfully Created');

      alert.addButton({
        text: 'Dismiss',
        handler: data=>{this.navCtrl.setRoot(ListClientsPage);}
      })
      alert.present();
    }
    else
    {
      let toast = this.toastCtrl.create({
        message: 'Client Failed to be Created',
        duration: 1500,
        position: 'top'
      });
      toast.present();
    }
  }

}
