import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PrimaveraProvider } from '../../providers/primavera/primavera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ClientPage } from '../client/client';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EditClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-client',
  templateUrl: 'edit-client.html',
  providers: [PrimaveraProvider]
})
export class EditClientPage {
  client: any;
  editClientForm: FormGroup;
  id: any;
  vendedor: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public primavera: PrimaveraProvider, private formBuilder: FormBuilder,
              public alertCtrl: AlertController, private toastCtrl: ToastController, private storage: Storage) {
    this.client = navParams.get('client');
    this.id = this.client["Cliente"];
    let nome = this.client['nome'];
    let Morada = this.client['Fac_Mor'];
    let Telefone = this.client['Fac_Tel'];
    let NumContribuinte = this.client['NumContrib'];
    let Moeda = this.client['Moeda'];
    let Pais = this.client['pais'];
    let ModoPag = '';
    let ModoRec = '';
    let CondPag = '';
    if(this.client['ModoPag'] != null)
      ModoPag = this.client['ModoPag'];
    if(this.client['ModoRec'] != null)
      ModoRec = this.client['ModoRec'];
    if(this.client['CondPag'] != null)
      CondPag = this.client['CondPag'];
    this.editClientForm = this.formBuilder.group({
      Nome: [nome, Validators.required],
      Morada: [Morada, Validators.required],
      Telefone: [Telefone, Validators.required],
      NumContribuinte: [NumContribuinte, Validators.required],
      Moeda: [Moeda, Validators.required],
      Pais: [Pais, Validators.required],
      ModoPag: [ModoPag, Validators.required],
      ModoRec: [ModoRec, Validators.required],
      CondPag: [CondPag, Validators.required]
    });

    this.storage.get('Vendedor').then((val) => {
      this.vendedor = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditClientPage');
  }

  goToHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }

  editClient()
  {
    const access_token = this.primavera.genAccessToken();
    let nome = this.editClientForm.value['Nome'];
    let Morada = this.editClientForm.value['Morada'];
    let Telefone = this.editClientForm.value['Telefone'];
    let NumContribuinte = this.editClientForm.value['NumContribuinte'];
    let Moeda = this.editClientForm.value['Moeda'];
    let ModoPag = this.editClientForm.value['ModoPag'];
    let ModoRec = this.editClientForm.value['ModoRec'];
    let CondPag = this.editClientForm.value['CondPag'];
    let Pais = this.editClientForm.value['Pais'];

    const body = {
      "Vendedor": this.vendedor,
      "CodigoTabLog": "Cliente",
      "ChaveLog": "Cliente",
      "EstadoBE": "",
      "Cliente": this.id,
      "Nome": nome,
      "Morada": Morada,
      "Telefone": Telefone,
      "NumContribuinte": NumContribuinte,
      "Moeda": Moeda,
      "CondPag": CondPag,
      "ModoPag": ModoPag,
      "ModoRec": ModoRec,
      "pais": Pais,
      "EmModoEdicao": true
      };
      
    if(this.primavera.createClient(access_token, body) == 1)
    {
      let alert = this.alertCtrl.create();
      alert.setTitle('Cliented Successfully Edited');

      alert.addButton({
        text: 'Dismiss',
        handler: data=>{this.navCtrl.setRoot(ClientPage, {cid: this.id});}
      })
      alert.present();
    }
    else
    {
      let toast = this.toastCtrl.create({
        message: 'Client Failed to be Edited',
        duration: 1500,
        position: 'top'
      });
      toast.present();
    }

  }

}
